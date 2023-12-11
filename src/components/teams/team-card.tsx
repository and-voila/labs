import React from 'react';
import Link from 'next/link';
import { Team } from '@prisma/client';

import { CP_PREFIX } from '#/lib/const';

import { Card, CardContent } from '#/components/ui/card';

export interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = (props) => {
  const { team } = props;

  return (
    <Card className="relative box-border cursor-pointer overflow-visible hover:shadow-md">
      <div className="pointer-events-none grid outline-none">
        <Link
          href={`${CP_PREFIX}/${team.slug}`}
          className="pointer-events-auto absolute inset-0"
        />
        <CardContent className="flex h-full p-6">
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="block max-w-full justify-self-start truncate text-base font-semibold">
              {team.name}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
