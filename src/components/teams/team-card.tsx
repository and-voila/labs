import React from 'react';
import Link from 'next/link';
import { Membership, MembershipRole, Team } from '@prisma/client';

import { siteConfig } from '#/config/site';

import { CP_PREFIX } from '#/lib/const';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';

import { Icons } from '../shared/icons';
import { RoleBadge } from './role-badge';

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
          {!isPersonal ? (
            <Link
              href={`${CP_PREFIX}/${team.slug}`}
              className="pointer-events-auto absolute inset-0"
            />
          ) : (
            <Link
              href={`${CP_PREFIX}/settings`}
              className="pointer-events-auto absolute inset-0"
            />
          )}
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