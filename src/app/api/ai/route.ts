import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET = process.env?.TIPTAP_AI_SECRET as string;

export async function POST({
  teamSlug,
  postId,
  teamId,
  userId,
}: {
  teamSlug: string;
  postId: string;
  teamId: string;
  userId: string;
}): Promise<Response> {
  const jwt = await jsonwebtoken.sign(
    {
      teamSlug,
      postId,
      teamId,
      userId,
    },
    JWT_SECRET,
  );

  return new Response(JSON.stringify({ token: jwt }));
}
