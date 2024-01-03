import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { env } from 'env';

export const ratelimitRedis = new Redis({
  url: env.RATELIMIT_UPSTASH_REDIS_REST_URL || '',
  token: env.RATELIMIT_UPSTASH_REDIS_REST_TOKEN || '',
});

export const ratelimit = (
  requests: number = 10,
  seconds:
    | `${number} ms`
    | `${number} s`
    | `${number} m`
    | `${number} h`
    | `${number} d` = '10 s',
) => {
  return new Ratelimit({
    redis: ratelimitRedis,
    limiter: Ratelimit.slidingWindow(requests, seconds),
    analytics: true,
    prefix: 'av',
  });
};
