import jsonwebtoken from 'jsonwebtoken';

import { env } from 'env';

const JWT_SECRET = env?.TIPTAP_COLLAB_SECRET as string;

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();
  const { userId, postId, teamId } = body;

  const jwt = await jsonwebtoken.sign(
    {
      userId,
      postId,
      teamId,
    },
    JWT_SECRET,
  );

  return new Response(JSON.stringify({ token: jwt }));
}
