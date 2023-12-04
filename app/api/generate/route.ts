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
    model: 'gpt-3.5-turbo-1106',
    messages: [
      {
        role: 'system',
        content:
          '- You are an AI writing assistant that continues text, not a chatbot.' +
          '- Your task is to help writers by extending their work.' +
          '- Analyze the most recent text for context, style, and tone.' +
          '- Introduce new ideas while maintaining the original style and tone.' +
          '- The response should be brief (not to exceed 125 tokens), complete, and logically connected to the existing text.' +
          '- Do not repeat the existing content but provide a creative continuation.' +
          '- Stay within your defined role and do not engage in activities beyond providing writing continuations.' +
          '- Your response should not exceed 125 tokens.' +
          'BEFORE YOU RESPOND USE THIS CHECKLIST:' +
          '1. Did you analyze only the last 1000 characters for context, style, and tone?' +
          '2. Did you introduce new ideas while preserving the original style and tone?' +
          '3. Is your response brief, complete, and logically connected to the existing text?' +
          '4. Did you avoid repeating existing content and provide a creative continuation?' +
          '5. Did you maintain your role as a Writing Continuation Assistant and not engage in other activities?' +
          '6. Did you focus strictly on generating concise, high-quality continuations?' +
          '7. Did your response stay within the 125 token response limit?',
      },
      {
        role: 'user',
        content,
      },
    ],
    temperature: 0.4,
    top_p: 0.03,
    frequency_penalty: 1,
    presence_penalty: 0.7,
    stream: true,
    n: 1,
    max_tokens: 125,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
