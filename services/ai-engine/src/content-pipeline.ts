// Content Pipeline Service — PORTECOS ACADEMIC IA
// Orchestrates lesson generation + video generation into a single autonomous pipeline

import { lessonGenerator } from './lesson-generator';
import { videoGenerator } from './video-generator';
import type { GeneratedLesson, ContentGenerationStatus } from '../../../shared/types';

export class ContentPipelineService {
  private statusMap: Map<string, ContentGenerationStatus> = new Map();
  private static readonly RATE_LIMIT_DELAY_MS = 2000;

  /**
   * Full pipeline: generate text lessons → save to DB → generate videos → update video URLs.
   * Returns an array of complete lessons (text + optional video URL).
   */
  async generateFullCourseContent(
    competencyId: string,
    competencyTitle: string,
    competencyDescription: string,
    areaSlug: string,
    courseId: string
  ): Promise<GeneratedLesson[]> {
    this.updateStatus(competencyId, 'generating_lessons', 0, 0);

    let lessons: GeneratedLesson[] = [];

    try {
      // Step 1: Generate text lessons
      console.log(`[ContentPipeline] Generating lessons for competency: ${competencyTitle}`);
      lessons = await lessonGenerator.generateLessonsForCompetency(
        competencyId,
        competencyTitle,
        competencyDescription,
        areaSlug
      );
      this.updateStatus(competencyId, 'generating_lessons', lessons.length, 0);

      // Step 2: Save text lessons to DB
      await lessonGenerator.saveLessonsToDatabase(courseId, lessons);

      // Step 3: Generate videos for each lesson
      this.updateStatus(competencyId, 'generating_videos', lessons.length, 0);
      const completedLessons: GeneratedLesson[] = [];
      let videosGenerated = 0;

      for (const lesson of lessons) {
        try {
          // Build a minimal Lesson object for the video generator
          const lessonForVideo = {
            id: this.buildLessonId(courseId, lesson.order),
            courseId,
            title: lesson.title,
            order: lesson.order,
            type: lesson.type,
            content: lesson.content,
            question: lesson.question,
            options: lesson.options,
            correctAnswer: lesson.correctAnswer,
            explanation: lesson.explanation,
            xpReward: lesson.xpReward,
          };

          const videoResult = await videoGenerator.generateVideoForLesson(lessonForVideo);
          completedLessons.push({ ...lesson, videoUrl: videoResult.videoUrl });
          videosGenerated++;

          this.updateStatus(competencyId, 'generating_videos', lessons.length, videosGenerated);
          console.log(
            `[ContentPipeline] Video generated for lesson "${lesson.title}" (${videoResult.provider})`
          );
        } catch (videoErr) {
          // Non-fatal: lesson is still usable without video
          console.warn(
            `[ContentPipeline] Video generation failed for lesson "${lesson.title}":`,
            videoErr
          );
          completedLessons.push(lesson);
        }
      }

      // Step 4: Update lessons with video URLs in DB
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
        const { updateLessonVideoUrl } = await import('../../../shared/lib/database');
        for (const lesson of completedLessons) {
          if (lesson.videoUrl) {
            const lessonId = this.buildLessonId(courseId, lesson.order);
            await updateLessonVideoUrl(lessonId, lesson.videoUrl);
          }
        }
      }

      this.updateStatus(competencyId, 'completed', lessons.length, videosGenerated);
      console.log(
        `[ContentPipeline] ✅ Completed: ${lessons.length} lessons, ${videosGenerated} videos`
      );

      return completedLessons;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.updateStatus(competencyId, 'failed', lessons.length, 0, message);
      console.error('[ContentPipeline] ❌ Failed for competency:', competencyId, err);
      throw err;
    }
  }

  /**
   * Batch-processes all competencies for a program, generating content sequentially
   * with rate limiting to avoid API limits.
   */
  async generateContentForAllCompetencies(programId: string): Promise<void> {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      console.warn('[ContentPipeline] Supabase not configured — cannot fetch competencies');
      return;
    }

    const { getSupabaseServer } = await import('../../../shared/lib/supabase');
    const supabase = getSupabaseServer();

    const { data: competencies, error } = await supabase
      .from('competencies')
      .select('*, programs(slug, area_id)')
      .eq('program_id', programId)
      .order('order', { ascending: true });

    if (error || !competencies?.length) {
      console.warn('[ContentPipeline] No competencies found for program', programId, error?.message);
      return;
    }

    console.log(
      `[ContentPipeline] Processing ${competencies.length} competencies for program ${programId}`
    );

    for (const comp of competencies) {
      try {
        // Rate-limit: wait between competencies to avoid API throttling
        await new Promise((resolve) =>
          setTimeout(resolve, ContentPipelineService.RATE_LIMIT_DELAY_MS)
        );

        const areaSlug = comp.programs?.slug ?? 'engenharia-civil';
        const courseId = `course-${comp.id}`;

        await this.generateFullCourseContent(
          comp.id,
          comp.title,
          comp.description,
          areaSlug,
          courseId
        );
      } catch (err) {
        console.error(`[ContentPipeline] Failed for competency ${comp.id}:`, err);
        // Continue with next competency
      }
    }

    console.log(`[ContentPipeline] ✅ Batch generation complete for program ${programId}`);
  }

  /**
   * Returns the current generation status for a competency.
   */
  getStatus(competencyId: string): ContentGenerationStatus | undefined {
    return this.statusMap.get(competencyId);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private buildLessonId(courseId: string, order: number): string {
    return `${courseId}-lesson-${order}`;
  }

  private updateStatus(
    competencyId: string,
    status: ContentGenerationStatus['status'],
    lessonsGenerated: number,
    videosGenerated: number,
    error?: string
  ): void {
    const existing = this.statusMap.get(competencyId);
    this.statusMap.set(competencyId, {
      competencyId,
      status,
      lessonsGenerated,
      videosGenerated,
      error,
      startedAt: existing?.startedAt ?? new Date().toISOString(),
      completedAt:
        status === 'completed' || status === 'failed' ? new Date().toISOString() : undefined,
    });
  }
}

export const contentPipeline = new ContentPipelineService();
