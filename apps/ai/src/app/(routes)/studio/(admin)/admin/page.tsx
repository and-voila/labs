import type { Metadata } from 'next';
import type { SVGProps } from 'react';

import Link from 'next/link';

import { cn } from '@av/ui';
import { buttonVariants } from '@av/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@av/ui/card';
import { Icons } from '@av/ui/icons';
import { APP_BP } from '@av/utils';

import { siteConfig } from '#/config/site';

import { DashboardHeader } from '#/components/dashboard/header';

export const metadata: Metadata = {
  title: 'Admin Center',
  description: `Exclusive admin access to ${siteConfig.name}'s nerve center. Manage tools, oversee playbooks, and steer the community's digital marketing journey effectively.`,
};

interface AdminItemProps {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  title: string;

  linkText: string;
  linkHref: string;
  isExternal?: boolean;
  disabled?: boolean;
}

const adminItems: AdminItemProps[] = [
  {
    title: 'Discord Admin',
    icon: Icons.discord,
    linkHref:
      'https://discord.com/channels/1151749282806910976/1154374693789384754',
    linkText: 'Go to Discord admin',
    isExternal: true,
  },
  {
    title: 'AI admin',
    icon: Icons.robot,
    linkHref: `${APP_BP}/admin/ai`,
    linkText: 'Manage AI tools',
    disabled: true,
  },
];

export default async function AdminPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Admin center"
        description="This is the future home of our super duper admin dashboard."
      />
      <div
        className={cn(
          'my-8 grid w-full gap-6 md:my-12',
          'grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
        )}
      >
        {adminItems.map((item, index) => (
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
            <CardFooter className="mt-auto justify-end">
              {item.disabled ? (
                <button
                  className={cn(
                    buttonVariants({
                      className: 'w-full justify-between',
                      variant: 'secondary',
                    }),
                    'cursor-not-allowed',
                  )}
                  aria-label={`Link to ${item.title} - ${item.linkText}`}
                  disabled
                >
                  {item.linkText}
                  <Icons.arrowRight
                    className="h-5 w-5 justify-end text-alternate"
                    aria-hidden="true"
                  />
                </button>
              ) : (
                <Link
                  href={item.linkHref}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className={cn(
                    buttonVariants({
                      className: 'w-full justify-between',
                      variant: 'secondary',
                    }),
                  )}
                  aria-label={`Link to ${item.title} - ${item.linkText}`}
                >
                  {item.linkText}
                  <Icons.arrowRight
                    className="h-5 w-5 justify-end text-alternate"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
