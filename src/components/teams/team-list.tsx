import React from 'react';
import { Team } from '@prisma/client';

import { cn } from '#/lib/utils';

import { NewTeamButton } from '#/components/teams/new-team-button';
import { TeamCard } from '#/components/teams/team-card';

export interface TeamGalleryProps {
  teams: Team[];
}

export const TeamGallery: React.FC<TeamGalleryProps> = (props) => {
  const { teams } = props;

  return (
    <div
      className={cn(
        'grid w-full gap-6',
        'grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
      )}
    >
      {teams.map((team) => (
        <TeamCard key={team.slug} team={team} />
      ))}

      <NewTeamButton />
    </div>
  );
};
