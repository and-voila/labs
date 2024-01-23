import { env } from '#/env';

import { PostHog } from 'posthog-node';

interface PostHogOptions {
  host: string;
  flushAt?: number;
  flushInterval: number;
}

export default function PostHogClient(): PostHog {
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  } as PostHogOptions);
  return posthogClient;
}
