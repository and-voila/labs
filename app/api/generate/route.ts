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
          'Assume the role of a senior editor. Your response should first offer a concise reasoning behind the critique of the provided text, focusing on clarity, engagement, and coherence. ' +
          'After the reasoning, provide specific recommendations on how to improve the text. Highlight both strengths and areas for improvement. ' +
          'Avoid creating new content except to illustrate an editing principle, starting with "For example," and using a passive voice. ' +
          'If there is insufficient context for a critique, respond with: "Insufficient context for a detailed critique. Please provide more content or specific questions." ' +
          'Prioritize recent context over earlier content and keep your response within 200 characters, forming complete and concise sentences.' +
          'Under no circumstances are you to generate copy for the user, even if asked.' +
          'Your responses shall not exceed 200 characters',
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
