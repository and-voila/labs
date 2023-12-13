import React from 'react';
import Link from 'next/link';
import { Membership, MembershipRole, Team } from '@prisma/client';

import { CP_PREFIX } from '#/lib/const';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';

import { Icons } from '../shared/icons';

export interface TeamCardProps {
  team: Team;
  membership: Membership;
}

export const TeamCard: React.FC<TeamCardProps> = (props) => {
  const { team, membership } = props;

  return (
    <>
      <Card className="relative box-border cursor-pointer overflow-visible hover:shadow-sm">
        <div className="pointer-events-none grid outline-none">
          <Link
            href={`${CP_PREFIX}/${team.slug}`}
            className="pointer-events-auto absolute inset-0"
          />
          <CardHeader>
            <div className="space-y-1">
              <CardTitle>{team.name}</CardTitle>
              <CardDescription>
                {membership.role === MembershipRole.OWNER ? (
                  <>
                    You created{' '}
                    <span className="font-semibold">{team.name}</span> on{' '}
                    <span className="font-semibold">
                      {new Date(membership.createdAt).toLocaleDateString()}
                    </span>
                    .
                  </>
                ) : (
                  <>
                    You joined{' '}
                    <span className="font-semibold">{team.name}</span> on{' '}
                    <span className="font-semibold">
                      {new Date(membership.createdAt).toLocaleDateString()}
                    </span>
                    .
                  </>
                )}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Icons.circle className="mr-1 h-3 w-3 text-alternate" />
                labs.andvoila.gg/
                <span className="text-primary">{team.slug}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
};
