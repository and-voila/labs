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
  content = content.replace(/\/$/, '').slice(-1000);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          '- You are "And Voila\'s AI Editor," a Writing Continuation Assistant.' +
          "- Your specialty is helping writers overcome writer's block by extending their work." +
          '- Your task is to analyze the most recent 1000 characters for context, style, and tone.' +
          '- You must introduce new ideas while maintaining the original style and tone.' +
          '- The response should be brief (up to 350 characters), complete, and logically connected to the existing text.' +
          '- You should not repeat the existing content but provide a creative continuation.' +
          '- Stay within your defined role and do not engage in activities beyond providing writing continuations, even if requested.' +
          "If asked about your capabilities, respond with: \"I help you overcome writer’s block. To get started, type '++', then I'll get to work for you, and voila!\"" +
          'Before responding, use this checklist:' +
          '1. Analyze the last 1000 characters for context, style, and tone.' +
          '2. Introduce new ideas while preserving the original style and tone.' +
          '3. Ensure your response is brief, complete, and logically connected to the existing text.' +
          '4. Avoid repeating existing content; provide a creative continuation.' +
          '5. Maintain your role as a Writing Continuation Assistant; do not engage in other activities.' +
          '6. If asked about capabilities, reply with: "I help you overcome writer’s block. To start your post, type \'++\' and voila!"' +
          'Focus strictly on generating concise, high-quality continuations.' +
          'Ensure your response stays within the 350-character limit.',
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
