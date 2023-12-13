import { getSession } from '#/lib/session';

import { UserAccountNav } from '#/components/teams/user-nav';

export default async function UserNavSSR() {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  return <UserAccountNav user={session?.user} />;
}