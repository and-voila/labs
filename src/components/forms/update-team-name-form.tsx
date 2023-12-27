'use client';

import React, { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';

import { siteConfig } from '#/config/site';

import { updateTeam } from '#/lib/actions/teams/team-settings';
import {
  UpdateTeamNameFormSchema,
  updateTeamNameFormSchema,
} from '#/lib/validations/update-team';

import { Button } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import { toast } from '#/components/ui/use-toast';

export interface UpdateTeamNameFormProps {
  teamSlug: string;
  defaultValues: Partial<UpdateTeamNameFormSchema>;
}

export const UpdateTeamNameForm: React.FC<UpdateTeamNameFormProps> = (
  props,
) => {
  const { defaultValues, teamSlug } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<UpdateTeamNameFormSchema>({
    resolver: zodResolver(updateTeamNameFormSchema),
    defaultValues: {
      name: '',
      ...defaultValues,
    },
  });

  const onSubmit = async (data: UpdateTeamNameFormSchema) => {
    setIsSubmitting(true);
    try {
      const result = await updateTeam(teamSlug, data);
      if (result.status === 'OK') {
        return toast({
          title: 'Team name updated',
          description: `Thanks for making ${siteConfig.name} yours. Your team's name has been updated and you're all set.`,
          variant: 'success',
        });
      }

      toast({
        title: 'Your team name was not updated',
        description:
          "We're sorry we couldn't process your team name update. Please try again. If the problem persists, please contact support",
        variant: 'destructive',
      });
    } catch (e) {
      // error5t
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormControl>
          <Input placeholder="Workspace name" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    ),
    [],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Name</CardTitle>
            <CardDescription>
              Name of the current workspace and team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={renderInput}
            />
          </CardContent>
          <CardFooter className="py-3">
            <div className="ml-auto flex items-center justify-end">
              <Button
                isLoading={form.formState.isSubmitting}
                type="submit"
                disabled={!form.formState.isValid}
              >
                Save
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
