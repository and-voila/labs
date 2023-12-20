import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createTeam } from '#/lib/actions/teams/create-team';
import { APP_BP } from '#/lib/const';
import {
  newTeamFormSchema,
  NewTeamFormValues,
} from '#/lib/validations/new-team';

import { Button } from '#/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import { toast } from '#/components/ui/use-toast';

const defaultValues: NewTeamFormValues = {
  name: '',
};

export const NewTeamForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NewTeamFormValues>({
    resolver: zodResolver(newTeamFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { watch, formState } = form;
  const name = watch('name');

  const slugPreview = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const onSubmit = async (data: NewTeamFormValues) => {
    setIsSubmitting(true);
    try {
      //console.log('Submitting form with data:', data);
      const result = await createTeam(data);
      if (result.data) {
        toast({
          title: 'Team created',
          description:
            "Your new team workspace has been created successfully. We'll send you there in just a sec.",
          variant: 'success',
        });
        router.push(`${APP_BP}/${result.data.slug}/workspace/home`);
      } else if (result.error) {
        toast({
          title: 'Team not created',
          description: result.error,
          variant: 'destructive',
        });
      }
    } catch (e) {
      toast({
        title: 'Could not create team',
        description:
          'An unexpected error occurred and we were not able to create your team. Please try again. If the problem persists, please contact support. Thank you.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New team name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormDescription className="my-2 text-sm text-muted-foreground">
                Your team workspace will be{' '}
                <span className="font-medium">labs.andvoila.gg</span>
                <span className="font-medium text-primary">
                  {slugPreview ? `/${slugPreview}` : '/...'}
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            size="sm"
            type="submit"
            isLoading={isSubmitting}
            disabled={!formState.isValid || !formState.isDirty || isSubmitting}
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
