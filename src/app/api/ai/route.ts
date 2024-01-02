import jsonwebtoken from 'jsonwebtoken';

import { env } from 'env';

const JWT_SECRET = env?.TIPTAP_AI_SECRET as string;

export async function POST(): Promise<Response> {
  const jwt = await jsonwebtoken.sign(
    {
      /* object to be encoded in the JWT */
    },
    JWT_SECRET,
  );

  return new Response(JSON.stringify({ token: jwt }));
}
