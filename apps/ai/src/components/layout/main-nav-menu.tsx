'use client';

import type { Team } from '#/lib/operations/teams/get-teams';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@and-voila/ui';
import { Badge } from '@and-voila/ui/badge';
import { Icons } from '@and-voila/ui/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@and-voila/ui/navigation-menu';
import { APP_BP } from '@and-voila/utils';

interface MainNavigationMenuProps {
  teams?: Team[];
  user?: {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
    displayName: string;
  } | null;
  activeTeamSlug?: string | null | undefined;
}

export const MainNavigationMenu: React.FC<MainNavigationMenuProps> = ({
  teams,
  activeTeamSlug,
}) => {
  const [activeSlug, setActiveSlug] = React.useState(activeTeamSlug);

  React.useEffect(() => {
    if (!activeSlug) {
      const personalTeamSlug = teams?.find((team) => team.isPersonal)?.slug;
      if (personalTeamSlug) {
        setActiveSlug(personalTeamSlug);
      }
    }
  }, [activeSlug, teams]);

  // TODO: Create config file(s) for these

  const resources: {
    title: string;
    href: string;
    description: string;
    disabled?: boolean;
  }[] = [
    {
      title: 'Publish',
      href: `${APP_BP}/${activeSlug}/workspace/publish`,
      description:
        'Create your website in under 3 mins. Fast, easy, and looks great.',
    },
    {
      title: 'Manage Sites',
      href: `${APP_BP}/${activeSlug}/workspace/publish/sites`,
      description:
        'Keep an eye on your sites and draft posts with an AI-assisted editor that helps you protect your IP.',
    },
    {
      title: 'Collaborate',
      href: `${APP_BP}/my/workspaces`,
      description: 'Invite your team for next-level multiplayer collaboration.',
    },
    {
      title: 'AI Experts',
      href: `${APP_BP}/${activeSlug}/workspace/chat`,
      description: 'Engage with purpose-trained marketing AI that just works.',
      disabled: true,
    },
  ];
  const shortcuts: {
    title: string;
    href: string;
    description: string;
    disabled?: boolean;
    isExternal?: boolean;
  }[] = [
    {
      title: 'Dashboard',
      href: `${APP_BP}/${activeSlug}/workspace`,
      description:
        'Your marketing operations HQ. All your tools and data at a glance.',
    },
    {
      title: 'Teams',
      href: `${APP_BP}/my/workspaces`,
      description: 'Collaborate in real-time with multiplayer convenience.',
    },
    {
      title: 'Publish',
      href: `${APP_BP}/${activeSlug}/workspace/publish`,
      description:
        'Create your own website, or two, and share some love with your audience.',
    },
    {
      title: 'Support',
      href: 'https://discord.com/channels/1151749282806910976/1151825811427561623',
      description:
        "Get the support you need from real people, we're here for you.",
      isExternal: true,
    },
    {
      title: 'Pricing',
      href: '/pricing',
      description:
        'Need an upgrade? We offer transparent and flexible pricing.',
    },
  ];

  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  if (pathname.includes(APP_BP)) {
    return null;
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Get started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-violet-950 via-primary to-violet-950 p-6 no-underline outline-none focus:shadow-md"
                    href="https://discord.com/channels/1151749282806910976/1164902538731069542"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join our Discord community in a new window"
                  >
                    <Icons.discord
                      className="h-8 w-8 text-primary-foreground"
                      aria-hidden
                    />
                    <div className="mb-2 mt-4 text-lg font-semibold text-primary-foreground">
                      Community
                    </div>
                    <p className="text-sm leading-tight text-primary-foreground">
                      Hop into our Discord server for real-time marketing magic
                      and community.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shortcuts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {shortcuts.map((shorcut) => (
                <ListItem
                  key={shorcut.title}
                  title={shorcut.title}
                  href={shorcut.href}
                  disabled={shorcut.disabled}
                  isExternal={shorcut.isExternal}
                >
                  {shorcut.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger
            className={
              isActive(`${APP_BP}/${activeSlug}/workspace/publish`)
                ? 'text-primary'
                : ''
            }
          >
            <Link href={`${APP_BP}/${activeSlug}/workspace/publish`}>
              Resources
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {resources.map((resource) => (
                <ListItem
                  key={resource.title}
                  title={resource.title}
                  href={resource.href}
                  disabled={resource.disabled}
                >
                  {resource.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    disabled?: boolean;
    isExternal?: boolean;
    title: string;
  }
>(({ className, title, children, disabled, isExternal, ...props }, ref) => {
  const disabledClasses = 'cursor-not-allowed opacity-70 pointer-events-none';
  const baseClasses =
    'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground';

  const target = isExternal ? '_blank' : undefined;
  const rel = isExternal ? 'noopener noreferrer' : undefined;
  const ariaLabel = isExternal
    ? `Navigate to the ${title} in a new window`
    : `Navigate to the ${title} page`;

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            baseClasses,
            { [disabledClasses]: disabled },
            className,
          )}
          {...props}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
        >
          <div className="flex flex-row items-center text-sm font-semibold leading-none text-primary">
            {title}
            {disabled && <Badge variant="comingSoon">Coming soon</Badge>}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
