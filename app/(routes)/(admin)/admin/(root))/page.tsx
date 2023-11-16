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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { authOptions } from '@/app/lib/auth';
import { getSession } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';
import { cn } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: 'Admin Center',
  description:
    "Exclusive admin access to And Voila's nerve center. Manage tools, oversee playbooks, and steer the community's digital marketing journey effectively.",
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
    linkHref: '/admin/ai',
    linkText: 'Manage AI tools',
    disabled: true,
  },
  {
    title: 'Playbooks admin',
    icon: Icons.courses,
    linkHref: '/admin/teacher/courses',
    linkText: 'Manage Playbooks',
  },
  {
    title: 'Support center',
    icon: Icons.help,
    linkHref: '/admin/support',
    linkText: 'Provide support',
    disabled: true,
  },
];

export default async function AdminPage() {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  } else if (!isTeacher(session.user.id)) {
    redirect('/not-authorized');
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Admin center"
        text="This is the future home of our super duper admin dashboard."
      />
      <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-2">
        {adminItems.map((item, index) => (
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
                    className="h-5 w-5 justify-end text-brand"
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
                    className="h-5 w-5 justify-end text-brand"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
