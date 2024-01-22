import { env } from '#/env';

import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET = env?.TIPTAP_COLLAB_SECRET;

export async function POST(): Promise<Response> {
  const jwt = await jsonwebtoken.sign(
    {
      /* TODO: Decide if we need to encode info in the JWT */
    },
    JWT_SECRET,
  );

  return new Response(JSON.stringify({ token: jwt }));
}
