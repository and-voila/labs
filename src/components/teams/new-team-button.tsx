import { Icons } from '#/components/shared/icons';
import { CP_PREFIX } from '#/lib/const';
import Link from 'next/link';

export const NewTeamButton: React.FC = () => {
  return (
    <Link
      href={`${CP_PREFIX}/team/new`}
      className="grid h-full items-center justify-stretch rounded-md border-2 border-dashed p-4 leading-4 hover:bg-accent"
    >
      <span className="grid grid-flow-col items-center justify-center gap-x-2">
        <Icons.plusCircled />
        <span className="leading-7">New Team</span>
      </span>
    </Link>
  );
};
