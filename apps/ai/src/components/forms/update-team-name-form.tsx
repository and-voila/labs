'use client';

import type { UpdateTeamNameFormSchema } from '#/lib/validations/update-team';
import type { FieldValues } from 'react-hook-form';

import React, { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@and-voila/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@and-voila/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@and-voila/ui/form';
import { Input } from '@and-voila/ui/input';
import { toast } from '@and-voila/ui/use-toast';

import { siteConfig } from '#/config/site';

import { updateTeam } from '#/lib/actions/teams/team-settings';
import { updateTeamNameFormSchema } from '#/lib/validations/update-team';

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

  const [inputColor, setInputColor] = useState('text-muted-foreground');
  const watchedName = form.watch('name');

  // Add this useEffect hook to update the input color
  useEffect(() => {
    if (watchedName !== defaultValues.name) {
      setInputColor('text-foreground');
    } else {
      setInputColor('text-muted-foreground');
    }
  }, [watchedName, defaultValues.name]);

  const renderInput = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormControl>
          <Input
            placeholder="Workspace name"
            className={inputColor}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    ),
    [inputColor],
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
                size="sm"
                isLoading={form.formState.isSubmitting}
                type="submit"
                disabled={!form.formState.isValid || !form.formState.isDirty}
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
