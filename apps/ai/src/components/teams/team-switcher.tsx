'use client';

import type { Team } from '#/lib/operations/teams/get-teams';

import React, { startTransition, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { userColors } from '@av/editor/constants';
import { cn } from '@av/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@av/ui/avatar';
import { Button } from '@av/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@av/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@av/ui/dialog';
import { Icons } from '@av/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@av/ui/popover';
import { APP_BP, randomElement } from '@av/utils';

import { NewTeamForm } from '#/components/forms/new-team-form';

export interface TeamSwitcherProps {
  activeTeamSlug?: string | null | undefined;
  teams?: Team[];
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
    displayName: string;
  } | null;
}

export const TeamSwitcher: React.FC<TeamSwitcherProps> = (props) => {
  const { teams, activeTeamSlug } = props;

  const router = useRouter();
  const [isOpen, setOpen] = React.useState(false);

  const activeTeam = useMemo(() => {
    return teams?.find((team) => team.slug === activeTeamSlug);
  }, [teams, activeTeamSlug]);

  const personalTeam = teams?.find((team) => team.isPersonal);

  const currentPath = usePathname().split('/').slice(4).join('/');

  const onTeamSelect = useCallback(
    (team: Team) => {
      startTransition(() => {
        setOpen(false);
        router.replace(`${APP_BP}/${team.slug}/workspace/${currentPath}`);
      });
    },
    [currentPath, router],
  );

  const onTeamSelectCallback = useCallback(
    (team: Team) => {
      return () => onTeamSelect(team);
    },
    [onTeamSelect],
  );

  const onPersonalTeamSelect = useCallback(() => {
    if (personalTeam) {
      onTeamSelect(personalTeam);
    }
  }, [personalTeam, onTeamSelect]);

  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const openDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const randomColor = useMemo(() => randomElement(userColors), []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <Popover open={isOpen} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            aria-label="Select workspace"
            className={cn('w-52 justify-between text-alternate')}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={
                  activeTeam?.image ??
                  `https://api.dicebear.com/7.x/shapes/svg?seed=${activeTeam?.id}.svg?backgroundColor=${(
                    randomColor ?? ''
                  ).replace('#', '')}`
                }
                alt={activeTeam?.name ?? 'Active Team'}
              />
              <AvatarFallback>&!</AvatarFallback>
            </Avatar>
            <span className="truncate text-xs">
              {activeTeam?.name ?? 'Active Team'}
            </span>

            <Icons.caretDown
              className={cn(
                'ml-auto h-4 w-4 shrink-0 transition-transform',
                isOpen ? 'rotate-180' : 'rotate-0',
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0">
          <Command>
            <CommandList>
              <CommandInput
                placeholder="Search workspaces..."
                className="bg-background text-xs"
              />
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Personal workspace">
                <CommandItem
                  key="personal"
                  className={cn(
                    'cursor-pointer text-sm',
                    activeTeam?.slug === personalTeam?.slug
                      ? 'bg-primary/20 font-semibold text-foreground'
                      : 'text-muted-foreground',
                  )}
                  onSelect={onPersonalTeamSelect}
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={
                        personalTeam?.image ??
                        `https://api.dicebear.com/7.x/shapes/svg?seed=${personalTeam?.id}.svg?backgroundColor=${(
                          randomColor ?? ''
                        ).replace('#', '')}`
                      }
                      alt={`Profile avatar of ${
                        personalTeam?.name ?? 'Personal Team'
                      }`}
                    />
                    <AvatarFallback>&!</AvatarFallback>
                  </Avatar>
                  <span className="truncate text-xs">
                    {personalTeam?.name ?? 'Personal Team'}
                  </span>
                  <Icons.check
                    className={cn(
                      'ml-auto h-4 w-4 text-foreground',
                      activeTeam?.slug === personalTeam?.slug
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Team workspaces">
                {teams
                  ?.filter((team) => !team.isPersonal)
                  .map((team) => (
                    <CommandItem
                      key={team.id}
                      className={cn(
                        'cursor-pointer text-sm',
                        activeTeam?.slug === team.slug
                          ? 'bg-primary/20 font-semibold text-foreground'
                          : 'text-muted-foreground',
                      )}
                      onSelect={onTeamSelectCallback(team)}
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={
                            team?.image ??
                            `https://api.dicebear.com/7.x/shapes/svg?seed=${team?.id}.svg?backgroundColor=${(
                              randomColor ?? 'bg-primary'
                            ).replace('#', '')}`
                          }
                          alt={`Profile avatar of ${team?.name ?? 'My Team'}`}
                        />
                        <AvatarFallback>&!</AvatarFallback>
                      </Avatar>
                      <span className="truncate">{team.name}</span>
                      <Icons.check
                        className={cn(
                          'ml-auto h-4 w-4 text-foreground',
                          activeTeam?.slug === team.slug
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup className="font-semibold">
                <DialogTrigger asChild>
                  <CommandItem
                    className="cursor-pointer text-sm"
                    onSelect={openDialog}
                  >
                    <Icons.plusCircled className="mr-2 h-5 w-5 text-primary" />
                    Create workspace
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create team workspace</DialogTitle>
          <DialogDescription>
            Ready to rally your crew or dazzle clients? Name your new workspace,
            set the slug, and dive into multiplayer mode. You&apos;ll be able to
            invite your team once it&apos;s created.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <NewTeamForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
