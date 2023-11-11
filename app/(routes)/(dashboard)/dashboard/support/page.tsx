import { SVGProps } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { Icons } from '@/app/components/shared/icons';
import { buttonVariants } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { authOptions } from '@/app/lib/auth';
import { getCurrentUser } from '@/app/lib/session';
import { cn } from '@/app/lib/utils';

export const metadata = {
  title: 'Support',
  description:
    "Find all the support you need on And Voila's Support page. From live Discord support to email assistance and extensive guides, we're here to help you excel in digital marketing.",
};

interface SupportItemProps {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  isExternal?: boolean;
}

const supportItems: SupportItemProps[] = [
  {
    icon: Icons.discord,
    title: 'Live support',
    description:
      'Hit us up on Discord for real-life support from...you guessed it, real people.',
    linkText: 'Contact live support',
    linkHref:
      'https://discord.com/channels/1151749282806910976/1151825811427561623',
    isExternal: true,
  },
  {
    icon: Icons.atSymbol,
    title: 'Email us',
    description:
      "Not so much into chatting? No worries, drop us a line and we'll get back to you in one business day.",
    linkText: 'Contact email support',
    linkHref: 'mailto:yo@andvoila.gg',
    isExternal: true,
  },
  {
    icon: Icons.file,
    title: 'Review guides',
    description:
      "Looking for something right here, right now? We're putting together a growing list of briefs, guides, and blogs.",
    linkText: 'Review guides',
    linkHref: '/insights',
  },
];

export default async function SupportPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Support"
        text="Need help with something? No problem, hit us up and we'll give you a hand, or two."
      />
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {supportItems.map((item, index) => (
          <Card key={index} className="flex flex-col" aria-label={item.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={cn('rounded-md', item)}>
                  <item.icon
                    className={cn('h-6 w-6 text-brand', item)}
                    aria-hidden="true"
                  />
                </div>
                <div>{item.title}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground lg:text-base">
              <CardDescription className="lg:text-base">
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="mt-auto justify-end">
              <Link
                href={item.linkHref}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                className={buttonVariants({
                  className: 'mt-4 w-full justify-between',
                  variant: 'secondary',
                })}
                aria-label={`Link to ${item.title} - ${item.linkText}`}
              >
                {item.linkText}
                {''}
                <Icons.arrowRight
                  className="h-5 w-5 justify-end text-brand"
                  aria-hidden="true"
                />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
