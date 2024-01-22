import type { Metadata } from 'next';
import type { SVGProps } from 'react';

import Link from 'next/link';

import { cn } from '@and-voila/ui';
import { buttonVariants } from '@and-voila/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@and-voila/ui/card';
import { Icons } from '@and-voila/ui/icons';

import { siteConfig } from '#/config/site';

import { APP_BP, SITE_URL } from '#/lib/const';

import { DashboardHeader } from '#/components/dashboard/header';

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
      "Not into chatting? No worries, drop us a line and we'll get back to you in a business day.",
    linkText: 'Contact email support',
    linkHref: 'mailto:hi@bril.la?subject=And%20Voila%20Support%20Request',
    isExternal: true,
  },
];

export default async function SupportPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Workspace support"
        description="Got questions or need a hand? We're all ears and ready to assist."
      />
      <div
        className={cn(
          'my-8 grid w-full gap-8 md:my-12',
          'grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
        )}
      >
        {supportItems.map((item, index) => (
          <Card key={index} className="flex flex-col" aria-label={item.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={cn('rounded-md', item)}>
                  <item.icon
                    className={cn('h-6 w-6 text-primary', item)}
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
                  className="h-5 w-5 justify-end text-primary"
                  aria-hidden="true"
                />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Team Support';
  const description = `Explore ${siteConfig.name}'s Team Support: Live Discord help, email assistance, and detailed guides at your fingertips. We're dedicated to your team's needs.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/my/workspaces`;

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
