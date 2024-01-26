import type { Membership, Team } from '@prisma/client';

import React from 'react';

import { cn } from '@av/ui';

import { EmptyPlaceholder } from '#/components/shared/empty-placeholder';
import { NewTeamButton } from '#/components/teams/new-team-button';
import { TeamCard } from '#/components/teams/team-card';

export interface TeamListProps {
  teams: Team[];
  memberships: Membership[];
}

export const TeamList: React.FC<TeamListProps> = (props) => {
  const { teams, memberships } = props;

  if (teams.length === 0) {
    return (
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="team" />
        <EmptyPlaceholder.Title>No workspaces found</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t currently have any team workspaces. Click the button
          below to create one and rally your crew.
        </EmptyPlaceholder.Description>
        <NewTeamButton />
      </EmptyPlaceholder>
    );
  }

  return (
    <div
      className={cn(
        'grid w-full gap-8',
        'grid-cols-[repeat(auto-fill,minmax(350px,1fr))]',
      )}
    >
      {teams.map((team, index) => (
        <TeamCard
          key={team.slug}
          team={team}
          membership={memberships[index] ?? ({} as Membership)}
          isPersonal={team.isPersonal}
        />
      ))}
      <NewTeamButton />
    </div>
  );
};
