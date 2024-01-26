import type { Membership, Team } from '@prisma/client';

import React from 'react';
import Link from 'next/link';
import { MembershipRole } from '@prisma/client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@av/ui/card';
import { Icons } from '@av/ui/icons';
import { APP_BP } from '@av/utils';

import { siteConfig } from '#/config/site';

import { RoleBadge } from '#/components/teams/role-badge';

export interface TeamCardProps {
  team: Team;
  membership: Membership;
  isPersonal?: boolean;
}

export const TeamCard: React.FC<TeamCardProps> = (props) => {
  const { team, membership, isPersonal = false } = props;

  return (
    <>
      <Card className="relative box-border cursor-pointer overflow-visible hover:shadow-sm">
        <div className="pointer-events-none grid outline-none">
          <Link
            href={`${APP_BP}/${team.slug}/workspace`}
            className="pointer-events-auto absolute inset-0"
          />
          <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
            <div className="space-y-1">
              <CardTitle>{team.name}</CardTitle>
              <CardDescription>
                You{' '}
                {isPersonal ? (
                  <>joined {siteConfig.name}</>
                ) : membership.role === MembershipRole.OWNER ? (
                  <>
                    created the team
                    <span className="font-semibold"> {team.name}</span>
                  </>
                ) : (
                  <>
                    joined the team
                    <span className="font-semibold"> {team.name}</span>
                  </>
                )}{' '}
                on{' '}
                <span className="font-semibold">
                  {new Date(membership.createdAt).toLocaleDateString()}
                </span>
                .
              </CardDescription>
            </div>
            <div className="flex items-center justify-end space-x-1 rounded-md">
              <RoleBadge isPersonal={isPersonal} role={membership.role} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Icons.circleFilled className="mr-1 h-3 w-3 text-alternate" />
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
