'use client';

import React, { useCallback, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form';
import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group';
import { toast } from '#/components/ui/use-toast';

const schema = z.object({
  theme: z.enum(['system', 'light', 'dark'], {
    required_error: 'Please select a theme.',
  }),
});

type FormValues = z.infer<typeof schema>;

export const AppearanceForm: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      theme: 'dark',
    },
  });

  useEffect(() => {
    if (theme === 'system' || theme === 'light' || theme === 'dark') {
      form.reset({ theme });
    }
  }, [theme, form]);

  const onSubmit = (data: FormValues) => {
    try {
      setTheme(data.theme);
      toast({
        title: 'Your theme was updated',
        description:
          'Thanks for making And Voila yours. Your theme was updated. You can come back and switch it anytime.',
        variant: 'success',
      });
    } catch {
      toast({
        title: 'Unable to update theme',
        description:
          "We're sorry, something went wrong. We weren't able to update your theme. Please try again.",
        variant: 'destructive',
      });
    }
  };

  const renderThemeField = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem className="space-y-1">
        <FormLabel>Theme</FormLabel>
        <FormDescription>Select the theme for the dashboard.</FormDescription>
        <FormMessage />
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          value={field.value}
          className="grid max-w-2xl grid-cols-3 gap-8 pt-2"
        >
          <FormItem>
            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
              <FormControl>
                <RadioGroupItem value="system" className="sr-only" />
              </FormControl>
              <div className="flex items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div className="w-1/2 space-y-2 overflow-hidden rounded-l-sm bg-[#edf1f2] py-2 pl-2">
                  <div className="space-y-2 rounded-l-md bg-white py-2 pl-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-l-lg bg-[#b0b3b8]" />
                    <div className="h-2 w-[100px] rounded-l-lg bg-[#b0b3b8]" />
                  </div>
                  <div className="flex h-[32px] items-center space-x-2 rounded-l-md bg-white py-2 pl-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#b0b3b8]" />
                    <div className="h-2 w-[55px] rounded-l-lg bg-[#b0b3b8]" />
                  </div>
                  <div className="flex h-[32px] items-center space-x-2 rounded-l-md bg-white py-2 pl-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#b0b3b8]" />
                    <div className="h-2 w-[55px] rounded-l-lg bg-[#b0b3b8]" />
                  </div>
                </div>
                <div className="w-1/2 space-y-2 overflow-hidden rounded-r-sm bg-[#0d0e10] py-2 pr-2">
                  <div className="space-y-2 rounded-md bg-[#1d1e20] py-2 pr-2 shadow-sm">
                    <div className="h-2 w-[30px] rounded-r-lg bg-[#747881]" />
                    <div className="h-2 w-[50px] rounded-r-lg bg-[#747881]" />
                  </div>
                  <div className="flex h-[32px] items-center space-x-2 rounded-r-md bg-[#1d1e20] py-2 pr-2 shadow-sm">
                    <div className="h-2 w-[40px] rounded-r-lg bg-[#747881]" />
                  </div>
                  <div className="flex h-[32px] items-center space-x-2 rounded-r-md bg-[#1d1e20] py-2 pr-2 shadow-sm">
                    <div className="h-2 w-[40px] rounded-r-lg bg-[#747881]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                System
              </span>
            </FormLabel>
          </FormItem>
          <FormItem>
            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
              <FormControl>
                <RadioGroupItem value="light" className="sr-only" />
              </FormControl>
              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div className="space-y-2 overflow-hidden rounded-sm bg-[#edf1f2] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#b0b3b8]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#b0b3b8]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#b0b3b8]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#b0b3b8]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#b0b3b8]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#edf1f2]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                And Voila Light
              </span>
            </FormLabel>
          </FormItem>
          <FormItem>
            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
              <FormControl>
                <RadioGroupItem value="dark" className="sr-only" />
              </FormControl>
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 overflow-hidden rounded-sm bg-[#0d0e10] p-2">
                  <div className="space-y-2 rounded-md bg-[#1d1e20] p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#747881]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#747881]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-[#1d1e20] p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#747881]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#747881]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-[#1d1e20] p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#747881]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#747881]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                And Voila Dark
              </span>
            </FormLabel>
          </FormItem>
        </RadioGroup>
      </FormItem>
    ),
    [],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="theme"
              render={renderThemeField}
            />
          </CardContent>
          <CardFooter className="py-3">
            <div className="ml-auto flex items-center justify-end">
              <Button
                size="sm"
                isLoading={form.formState.isSubmitting}
                type="submit"
                disabled={!form.formState.isDirty || !form.formState.isValid}
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
