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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover';

export interface TeamSwitcherProps {
  activeTeamSlug?: string;
  teams: Team[];
  userName: string | null;
}

export const TeamSwitcher: React.FC<TeamSwitcherProps> = (props) => {
  const { teams, activeTeamSlug, userName } = props;

  const router = useRouter();
  const [isOpen, setOpen] = React.useState(false);

  const activeTeam = useMemo(() => {
    return teams.find((team) => team.slug === activeTeamSlug);
  }, [teams, activeTeamSlug]);

  const onTeamSelect = (team: Team) => {
    startTransition(() => {
      setOpen(false);
      router.push(`${CP_PREFIX}/${team.slug}`);
    });
  };

  const onTeamCreate = () => {
    startTransition(() => {
      setOpen(false);
      router.push(`${CP_PREFIX}/team/new`);
    });
  };

  const handlePersonalSelect = () => {
    startTransition(() => {
      router.push('/app');
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a Team"
          className={cn('w-52 justify-between truncate')}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${
                activeTeam?.slug ?? 'personal'
              }.png`}
              alt={activeTeam?.name ?? userName ?? 'Personal account'}
            />
            <AvatarFallback>
              {(activeTeam?.name ?? userName ?? 'P')[0]}
            </AvatarFallback>
          </Avatar>
          {activeTeam?.name ?? userName ?? 'Personal account'}
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
            <CommandGroup heading="Personal account">
              <CommandItem
                key="personal"
                className="cursor-pointer text-sm"
                onSelect={handlePersonalSelect}
              >
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${userName}.png`}
                    alt={`Profile avatar of ${userName || 'the current user'}`}
                  />
                  <AvatarFallback>{userName?.[0]}</AvatarFallback>
                </Avatar>
                {userName ?? 'Personal account'}
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Teams">
              {teams.map((team) => (
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
              <CommandItem
                className="cursor-pointer text-sm"
                onSelect={onTeamCreate}
              >
                <Icons.plusCircled className="mr-2 h-5 w-5" />
                Create Team
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
