import { SVGProps } from 'react';
import { Metadata } from 'next';
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

interface DashboardItemProps {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  isExternal?: boolean;
  isDisabled?: boolean;
}

const dashboardItems: DashboardItemProps[] = [
  {
    title: 'Community',
    icon: Icons.discord,
    linkHref:
      'https://discord.com/channels/1151749282806910976/1164902538731069542',
    linkText: 'Work it',
    description:
      'Dive into a buzzing hub of marketing savants. Get real-time insights, priceless tips, and direct access to industry pros.',
    isExternal: true,
  },
  {
    title: 'Learn',
    icon: Icons.courses,
    linkHref: '/learn',
    linkText: 'Crush it',
    description:
      'Unlock daily micro-courses that supercharge your marketing game. Boost your ROI in less than 5 minutes per playbook.',
  },
  {
    title: 'Tools',
    icon: Icons.robot,
    linkHref: '/tools',
    linkText: 'Hack it',
    description:
      'Launch your own website in under 3 minutes with a custom domain and smash writer’s block with an AI-assist.',
    isDisabled: true,
  },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Head over to Discord, check out a playbook, or start publishing."
      />
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {dashboardItems.map((item, index) => (
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
                className={cn(
                  buttonVariants({
                    className: 'mt-4 w-full justify-between',
                    variant: 'secondary',
                  }),
                  item.isDisabled ? 'cursor-not-allowed opacity-80' : '',
                )}
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

export function generateMetadata(): Metadata {
  const title = 'Dashboard';
  const description =
    'Access the And Voila Dashboard for advanced marketing playbooks, effective AI tools, and to mingle in the best digital marketing Discord.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/dashboard`;

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: pageUrl,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };

  return metadata;
}
