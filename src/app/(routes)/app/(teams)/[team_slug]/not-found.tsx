import Link from 'next/link';

import { CP_PREFIX } from '#/lib/const';

const TeamNotFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={CP_PREFIX}>Return Home</Link>
    </div>
  );
};

export default TeamNotFound;
