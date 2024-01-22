'use client';

import type { FieldValues } from 'react-hook-form';

import React, { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MembershipRole } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@and-voila/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@and-voila/ui/form';
import { Input } from '@and-voila/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@and-voila/ui/select';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@and-voila/ui/sheet';
import { toast } from '@and-voila/ui/use-toast';

import { inviteMembers } from '#/lib/actions/teams/invite-members';

const schema = z.object({
  email: z.union([z.string().email(), z.array(z.string().email())]),
  role: z.nativeEnum(MembershipRole),
});

interface NewMemberForm {
  email: string | string[];
  role: MembershipRole;
}

const membershipRoleOptions = [
  { value: MembershipRole.MEMBER, label: 'Member' },
  { value: MembershipRole.ADMIN, label: 'Admin' },
  { value: MembershipRole.OWNER, label: 'Owner' },
];

export interface AddTeamMemberProps {
  teamSlug: string;
}

export const AddTeamMember: React.FC<AddTeamMemberProps> = (props) => {
  const { teamSlug } = props;

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<NewMemberForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      role: MembershipRole.MEMBER,
    },
  });

  const inviteMemberWithId = inviteMembers.bind(null, teamSlug);

  const onSubmit = async (data: NewMemberForm) => {
    setIsSubmitting(true);

    try {
      const result = await inviteMemberWithId({
        emails: Array.isArray(data.email) ? data.email : [data.email],
        role: data.role,
      });

      if (result.status === 'OK') {
        toast({
          title: 'Invitation sent!',
          description: result.message,
          variant: 'success',
        });
      } else {
        toast({
          title: 'Something went wrong.',
          description: result.message,
          variant: 'destructive',
        });
      }

      setIsOpen(false);
    } catch (e: unknown) {
      toast({
        title: 'Something went wrong.',
        description: e instanceof Error ? e.message : '',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = useCallback(
    (state: boolean) => {
      setIsOpen(state);
      form.reset();
    },
    [form],
  );

  const renderEmailField = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="email@example.com" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    ),
    [],
  );

  const renderRoleField = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormLabel>Invite as</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {membershipRoleOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    ),
    [],
  );

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button size="sm">Invite</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invite member</SheetTitle>
          <SheetDescription>Invite a new member to your team</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-10 mt-6 space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={renderEmailField}
              />
              <FormField
                control={form.control}
                name="role"
                render={renderRoleField}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              </SheetClose>
              <Button
                isLoading={isSubmitting}
                type="submit"
                size="sm"
                disabled={!form.formState.isValid}
              >
                Send invite
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
