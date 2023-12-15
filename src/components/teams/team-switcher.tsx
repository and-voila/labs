'use client';

import React, { startTransition, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Team } from '@prisma/client';

import { CP_PREFIX } from '#/lib/const';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Button } from '#/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '#/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover';

import { NewTeamForm } from '#/app/(routes)/app/(dashboard)/(root)/settings/workspaces/new/new-team-form';

export interface TeamSwitcherProps {
  activeTeamSlug?: string;
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
  const { teams, activeTeamSlug, user } = props;

  const router = useRouter();
  const [isOpen, setOpen] = React.useState(false);
  const [personalTeam, setPersonalTeam] = React.useState<Team | undefined>();

  const activeTeam = useMemo(() => {
    return teams?.find((team) => team.slug === activeTeamSlug);
  }, [teams, activeTeamSlug]);

  const onTeamSelect = (team: Team) => {
    startTransition(() => {
      setOpen(false);
      router.push(`${CP_PREFIX}/${team.slug}/settings/workspace`);
    });
  };

  React.useEffect(() => {
    if (teams) {
      const personal = teams.find((team) => team.isPersonal);
      setPersonalTeam(personal);
    }
  }, [teams]);

  const handlePersonalSelect = () => {
    startTransition(() => {
      if (personalTeam) {
        router.push(`${CP_PREFIX}/${personalTeam.slug}/settings/workspace`);
      } else {
        router.push(`${CP_PREFIX}/settings/workspaces`);
      }
    });
  };

  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <Popover open={isOpen} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={isOpen}
            aria-label="Select a Team"
            className={cn('w-52 justify-between')}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${
                  activeTeam?.slug ?? 'personal'
                }.png`}
                alt={activeTeam?.name ?? user?.name ?? 'Personal account'}
              />
              <AvatarFallback>
                {(activeTeam?.name ?? user?.name ?? 'P')[0]}
              </AvatarFallback>
            </Avatar>
            {activeTeam?.name ?? user?.name ?? 'Personal account'}
            <Icons.radixChevronDown
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
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup heading="Personal workspace">
                <CommandItem
                  key="personal"
                  className="cursor-pointer text-sm"
                  onSelect={handlePersonalSelect}
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${user?.name}.png`}
                      alt={`Profile avatar of ${
                        user?.name || 'the current user'
                      }`}
                    />
                    <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  {user?.name ?? 'Personal account'}
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
                        activeTeam?.slug === team.slug ? 'bg-primary/20' : '',
                      )}
                      onSelect={() => onTeamSelect(team)}
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${team.slug}.png`}
                          alt={team.name}
                        />
                        <AvatarFallback>{team.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <p className="truncate">{team.name}</p>
                      <Icons.radixCheck
                        className={cn(
                          'ml-auto h-4 w-4 text-primary',
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
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    className="cursor-pointer text-sm"
                    onSelect={() => setDialogOpen(true)}
                  >
                    <Icons.plusCircled className="mr-2 h-5 w-5" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Ready to rally your crew or dazzle clients? Name your team, set the
            slug, and dive into multiplayer mode. You&apos;ll be able to invite
            people to your team once it&apos;s created.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <NewTeamForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
