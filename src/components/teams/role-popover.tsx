'use client';

import React from 'react';
import { MembershipRole } from '@prisma/client';

import { changeRoleAction } from '#/lib/actions/teams/member-list-management';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '#/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover';
import { toast } from '#/components/ui/use-toast';

export interface RolePopoverProps {
  isOwner: boolean;
  isAdmin: boolean;
  teamSlug: string;
  memberId: string;
  role: string;
}

export const RolePopover: React.FC<RolePopoverProps> = (props) => {
  const { role, memberId, isOwner, isAdmin, teamSlug } = props;

  const [isOpen, setOpen] = React.useState(false);

  const handleUpdateRole = async (role: MembershipRole) => {
    try {
      const result = await changeRoleAction(memberId, teamSlug, role);
      const { status, message } = result;

      if (status === 'KO') {
        return toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
      }

      toast({
        title: 'Success',
        description: 'Role updated',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to change role',
        variant: 'destructive',
      });
    }
  };

  const renderCommandItem = (
    label: string,
    description: string,
    selectedRole: MembershipRole,
  ) => {
    const canChangeRole = isOwner || isAdmin;

    return (
      <CommandItem
        onSelect={() => handleUpdateRole(selectedRole)}
        className={`flex cursor-pointer flex-col items-start gap-y-1 px-4 py-2 ${
          !canChangeRole &&
          'aria-disabled:cursor-not-allowed aria-disabled:opacity-40'
        }`}
      >
        <p>{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CommandItem>
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a role"
          className={cn('w-52 justify-between truncate')}
          disabled={!isOwner && !isAdmin}
        >
          <span className="capitalize">{role}</span>
          <Icons.radixChevronDown
            className={cn(
              'ml-auto h-4 w-4 shrink-0 transition-transform',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <Command>
          <CommandList className="max-h-full">
            <CommandGroup>
              {renderCommandItem(
                'Member',
                'Able to collaborate on the team.',
                MembershipRole.MEMBER,
              )}
              {renderCommandItem(
                'Admin',
                'Able to manage team members and settings.',
                MembershipRole.ADMIN,
              )}
              {isOwner &&
                renderCommandItem(
                  'Owner',
                  'Able to manage team members, settings, and billing.',
                  MembershipRole.OWNER,
                )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
