// Video Generator Service — PORTECOS ACADEMIC IA
// Generates AI avatar video lessons using HeyGen (primary) or D-ID (fallback)

import { callLLM } from './openai-client';
import type { ChatMessage } from './openai-client';
import type { Lesson, VideoGenerationResult } from '../../../shared/types';

interface VideoConfig {
  provider: 'heygen' | 'd-id';
  avatarId?: string;
  voiceId?: string;
  language: string;
  resolution: '720p' | '1080p';
  maxDuration: number; // seconds
}

const DEFAULT_CONFIG: VideoConfig = {
  provider: 'heygen',
  avatarId: process.env.HEYGEN_AVATAR_ID,
  voiceId: process.env.HEYGEN_VOICE_ID,
  language: 'pt-AO',
  resolution: '1080p',
  maxDuration: 480, // 8 minutes
};

export class VideoGeneratorService {
  private config: VideoConfig;

  constructor(config?: Partial<VideoConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Main entry-point: generate a video lesson for a given lesson object.
   * Returns a VideoGenerationResult with the video URL and metadata.
   */
  async generateVideoForLesson(
    lesson: Lesson,
    options?: Partial<VideoConfig>
  ): Promise<VideoGenerationResult> {
    const config: VideoConfig = { ...this.config, ...options };

    // Step 1: Generate spoken script from lesson content
    const script = await this.generateVideoScript(lesson.content, lesson.title);

    // Step 2: Create video via configured provider (or mock)
    let videoUrl: string;
    let provider: VideoGenerationResult['provider'];

    if (process.env.HEYGEN_API_KEY) {
      videoUrl = await this.createVideoWithHeyGen(script, config);
      provider = 'heygen';
    } else if (process.env.DID_API_KEY) {
      videoUrl = await this.createVideoWithDID(script, config);
      provider = 'd-id';
    } else {
      console.warn(
        '[VideoGenerator] No HEYGEN_API_KEY or DID_API_KEY set — returning mock video URL'
      );
      videoUrl = `https://mock-videos.portecos.ao/lesson-${lesson.id}.mp4`;
      provider = 'mock';
    }

    // Step 3: Upload to Supabase Storage (if configured)
    if (process.env.SUPABASE_URL && provider !== 'mock') {
      videoUrl = await this.uploadToStorage(videoUrl, lesson.id);
    }

    return {
      lessonId: lesson.id,
      videoUrl,
      duration: this.estimateDuration(script),
      provider,
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Uses GPT-4o to convert lesson markdown content into a natural spoken script.
   * Targets ~150 words per minute, Portuguese (pt-AO).
   */
  async generateVideoScript(lessonContent: string, lessonTitle: string): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `És um especialista em roteiros educativos para PORTECOS ACADEMIC IA.
Converte conteúdo de lição em guião falado em Português (pt-AO).
O guião deve:
- Ter tom conversacional e envolvente
- Incluir pausas naturais marcadas com [PAUSA]
- Enfatizar termos-chave com [ÊNFASE: palavra]
- Adaptar o conteúdo técnico para apresentação verbal
- Visar ~150 palavras por minuto
- Manter o contexto angolano e exemplos locais`,
      },
      {
        role: 'user',
        content: `Converte esta lição em guião para vídeo:

Título: ${lessonTitle}

Conteúdo:
${lessonContent.slice(0, VideoGeneratorService.MAX_SCRIPT_CONTENT_LENGTH)}

Devolve apenas o guião falado, sem formatação extra.`,
      },
    ];

    const script = await callLLM(messages, { temperature: 0.6, maxTokens: 1000 });

    // If mock response, return a reasonable fallback
    if (script.startsWith('[Mock AI response')) {
      return this.buildMockScript(lessonTitle);
    }

    return script;
  }

  /**
   * Calls HeyGen API to generate a video with AI avatar.
   * Polls until the video is ready and returns the download URL.
   */
  async createVideoWithHeyGen(script: string, options: VideoConfig): Promise<string> {
    const apiKey = process.env.HEYGEN_API_KEY;
    if (!apiKey) throw new Error('HEYGEN_API_KEY is not set');

    const payload = {
      video_inputs: [
        {
          character: {
            type: 'avatar',
            avatar_id: options.avatarId ?? 'default_african_presenter',
            avatar_style: 'normal',
          },
          voice: {
            type: 'text',
            input_text: script,
            voice_id: options.voiceId ?? 'portuguese_angola',
            speed: 1.0,
          },
        },
      ],
      dimension: {
        width: options.resolution === '1080p' ? 1920 : 1280,
        height: options.resolution === '1080p' ? 1080 : 720,
      },
    };

    // Create video job
    const createResponse = await fetch('https://api.heygen.com/v2/video/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!createResponse.ok) {
      const err = await createResponse.text();
      throw new Error(`HeyGen API error (${createResponse.status}): ${err}`);
    }

    const { data } = (await createResponse.json()) as { data: { video_id: string } };
    const videoId = data.video_id;

    // Poll for completion (max 10 minutes)
    const videoUrl = await this.pollHeyGenVideo(videoId, apiKey);
    return videoUrl;
  }

  /**
   * Calls D-ID API to generate a talking-head video (fallback provider).
   */
  async createVideoWithDID(script: string, options: VideoConfig): Promise<string> {
    const apiKey = process.env.DID_API_KEY;
    if (!apiKey) throw new Error('DID_API_KEY is not set');

    const payload = {
      script: {
        type: 'text',
        input: script,
        provider: {
          type: 'microsoft',
          voice_id: 'pt-AO-AniaNeural',
        },
      },
      config: {
        fluent: true,
        pad_audio: 0,
        result_format: 'mp4',
      },
      source_url: options.avatarId
        ? `https://create-images-results.d-id.com/${options.avatarId}`
        : 'https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.jpeg',
    };

    const createResponse = await fetch('https://api.d-id.com/talks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
      },
      body: JSON.stringify(payload),
    });

    if (!createResponse.ok) {
      const err = await createResponse.text();
      throw new Error(`D-ID API error (${createResponse.status}): ${err}`);
    }

    const { id: talkId } = (await createResponse.json()) as { id: string };
    const videoUrl = await this.pollDIDVideo(talkId, apiKey);
    return videoUrl;
  }

  /**
   * Downloads the generated video and uploads it to Supabase Storage.
   * Returns the public Supabase URL.
   * Only fetches from trusted video provider domains to prevent SSRF.
   */
  async uploadToStorage(videoUrl: string, lessonId: string): Promise<string> {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      console.warn('[VideoGenerator] Supabase not configured — skipping storage upload');
      return videoUrl;
    }

    // Validate URL is from a trusted provider to prevent request forgery
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(videoUrl);
    } catch {
      throw new Error('[VideoGenerator] Invalid video URL');
    }

    if (parsedUrl.protocol !== 'https:') {
      throw new Error('[VideoGenerator] Video URL must use HTTPS');
    }

    const ALLOWED_HOSTS = new Set([
      'files.heygen.ai',
      'api.heygen.com',
      'create-images-results.d-id.com',
      'api.d-id.com',
      'talks-public-s3.d-id.com',
    ]);
    if (!ALLOWED_HOSTS.has(parsedUrl.hostname)) {
      throw new Error(`[VideoGenerator] Video URL host '${parsedUrl.hostname}' is not a trusted provider`);
    }

    // Use the parsed (validated) URL string to prevent any manipulation from the original input.
    const safeUrl = parsedUrl.toString();

    try {
      const { getSupabaseServer } = await import('../../../shared/lib/supabase');
      const supabase = getSupabaseServer();

      // Download the video from the trusted provider; disable redirects to prevent redirect attacks.
      const videoResponse = await fetch(safeUrl, { redirect: 'error' });
      if (!videoResponse.ok) {
        throw new Error(`Failed to download video: ${videoResponse.status}`);
      }

      const videoBuffer = await videoResponse.arrayBuffer();
      const fileName = `lesson-videos/${lessonId}-${Date.now()}.mp4`;

      const { error } = await supabase.storage
        .from('lesson-videos')
        .upload(fileName, videoBuffer, {
          contentType: 'video/mp4',
          upsert: true,
        });

      if (error) {
        console.warn('[VideoGenerator] Storage upload failed:', error.message);
        return videoUrl;
      }

      const { data } = supabase.storage.from('lesson-videos').getPublicUrl(fileName);
      return data.publicUrl;
    } catch (err) {
      console.warn('[VideoGenerator] Failed to upload to Supabase Storage:', err);
      return videoUrl;
    }
  }

  // ── Private helpers ────────────────────────────────────────────────────────

// Maximum characters of lesson content to include in a video script prompt.
  // Limits token usage and keeps the spoken script to a reasonable duration (~8 min).
  private static readonly MAX_SCRIPT_CONTENT_LENGTH = 3000;
  private static readonly POLL_MAX_ATTEMPTS = 60; // 10 minutes at 10s intervals
  private static readonly POLL_INTERVAL_MS = 10_000;

  private async pollHeyGenVideo(videoId: string, apiKey: string): Promise<string> {
    for (let attempt = 0; attempt < VideoGeneratorService.POLL_MAX_ATTEMPTS; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, VideoGeneratorService.POLL_INTERVAL_MS));

      const statusResponse = await fetch(
        `https://api.heygen.com/v1/video_status.get?video_id=${videoId}`,
        { headers: { 'X-Api-Key': apiKey } }
      );

      if (!statusResponse.ok) continue;

      const { data } = (await statusResponse.json()) as {
        data: { status: string; video_url?: string };
      };

      if (data.status === 'completed' && data.video_url) {
        return data.video_url;
      }

      if (data.status === 'failed') {
        throw new Error(`HeyGen video generation failed for video_id=${videoId}`);
      }
    }

    throw new Error(`HeyGen video generation timed out for video_id=${videoId}`);
  }

  private async pollDIDVideo(talkId: string, apiKey: string): Promise<string> {
    for (let attempt = 0; attempt < VideoGeneratorService.POLL_MAX_ATTEMPTS; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, VideoGeneratorService.POLL_INTERVAL_MS));

      const statusResponse = await fetch(`https://api.d-id.com/talks/${talkId}`, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
        },
      });

      if (!statusResponse.ok) continue;

      const talk = (await statusResponse.json()) as { status: string; result_url?: string };

      if (talk.status === 'done' && talk.result_url) {
        return talk.result_url;
      }

      if (talk.status === 'error') {
        throw new Error(`D-ID video generation failed for talk_id=${talkId}`);
      }
    }

    throw new Error(`D-ID video generation timed out for talk_id=${talkId}`);
  }

  private estimateDuration(script: string): number {
    const words = script.split(/\s+/).length;
    return Math.round((words / 150) * 60); // ~150 words per minute → seconds
  }

  private buildMockScript(lessonTitle: string): string {
    return `Olá, bem-vindo à PORTECOS ACADEMIC IA! [PAUSA]

Hoje vamos explorar um tema muito importante: [ÊNFASE: ${lessonTitle}].

Esta lição foi desenvolvida especialmente para o contexto angolano, com exemplos práticos relevantes para a nossa realidade de engenharia.

[PAUSA]

Ao longo desta aula, vamos abordar os conceitos fundamentais, ver aplicações práticas e compreender como estes conhecimentos se aplicam em projectos reais em Angola — desde as infraestruturas de Luanda até aos projectos petrolíferos de Cabinda.

[PAUSA]

Vamos começar! Presta atenção a cada conceito, pois serão avaliados no quiz no final da lição.

Obrigado por estudar na PORTECOS ACADEMIC IA — a primeira universidade virtual de engenharia de Angola!`;
  }
}

export const videoGenerator = new VideoGeneratorService();
