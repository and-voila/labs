'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

import { updateTeam } from '../actions';
import { GeneralFormSchema, generalFormSchema } from '../schema';

export interface GeneralFormProps {
  teamSlug: string;
  defaultValues: Partial<GeneralFormSchema>;
}

export const GeneralForm: React.FC<GeneralFormProps> = (props) => {
  const { defaultValues, teamSlug } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<GeneralFormSchema>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      name: '',
      ...defaultValues,
    },
  });

  const onSubmit = async (data: GeneralFormSchema) => {
    setIsSubmitting(true);
    try {
      const result = await updateTeam(teamSlug, data);
      if (result.status === 'OK') {
        return toast({
          title: 'Success',
          description: 'Team updated successfully.',
        });
      }

      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    } catch (e) {
      // error5t
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Name</CardTitle>
            <CardDescription>Name of the team.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Team name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
