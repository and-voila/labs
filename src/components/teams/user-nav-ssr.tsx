import { UserAccountNav } from '#/components/teams/user-nav';
import { getSession } from '#/lib/session';

export default async function UserNavSSR() {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  return <UserAccountNav user={session?.user} />;
}
