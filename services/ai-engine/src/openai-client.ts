// Real OpenAI client wrapper — PORTECOS ACADEMIC IA
// Provides a shared callLLM function used by mentor.ts and assessor.ts

import OpenAI from 'openai';

const openai = new OpenAI({
  // Use a placeholder when no key is configured — callLLM (below) returns mock
  // responses whenever process.env.OPENAI_API_KEY is falsy, so the real client
  // is never called in development/test environments.
  apiKey: process.env.OPENAI_API_KEY ?? 'not-set',
});

const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function callLLM(
  messages: ChatMessage[],
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }
): Promise<string> {
  // Fallback to mock if no API key is set (development / CI)
  if (!process.env.OPENAI_API_KEY) {
    console.warn('[PORTECOS] OPENAI_API_KEY not set — using mock response');
    const lastUser = messages.filter((m) => m.role === 'user').pop();
    return `[Mock AI response to: "${lastUser?.content?.slice(0, 80) ?? ''}"]`;
  }

  const completion = await openai.chat.completions.create({
    model: options?.model || DEFAULT_MODEL,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.maxTokens ?? 2048,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    console.warn('[PORTECOS] OpenAI returned an empty response for the request');
  }
  return content || '';
}

export { openai, DEFAULT_MODEL };
export type { ChatMessage };
