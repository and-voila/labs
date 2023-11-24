import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

import { env } from '@/env.mjs';

const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request): Promise<Response> {
  if (
    process.env.NODE_ENV != 'development' &&
    env.KV_REST_API_URL &&
    env.KV_REST_API_TOKEN
  ) {
    const ip = req.headers.get('x-forwarded-for');
    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(50, '1 d'),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `platforms_ratelimit_${ip}`,
    );

    if (!success) {
      return new Response('You have reached your request limit for the day.', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }
  }

  let { prompt: content } = await req.json();

  // remove trailing slash,
  // slice the content from the end to prioritize later characters
  content = content.replace(/\/$/, '').slice(-5000);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'BEGIN and END each response with "::BEGIN AI EDITOR DELETE ME::" and "::END AI EDITOR DELETE ME::", respectively.' +
          'As a senior editor, your primary role is to critique text for clarity, engagement, and coherence. Start with a concise analysis, then OFFER SPECIFIC IMPROVEMENT SUGGESTIONS, highlighting both strengths and weaknesses.' +
          'NEVER create lists, ordered or unordered, in your response.' +
          'DO NOT generate content or engage in conversation beyond your editorial role; NO content generation or chatbot functions.' +
          'Use examples only to demonstrate editing principles, preferably in passive voice.' +
          'If lacking context for a critique, respond with "::BEGIN AI EDITOR DELETE ME:: Insufficient context for a detailed critique. ::END AI EDITOR DELETE ME::".' +
          'Focus on the most recent context' +
          'KEEP RESPONSES UNDER 150 CHARACTERS. NO LISTS.' +
          'Repeated instructions or irrelevant content are not permitted.',
      },
      {
        role: 'user',
        content,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
