'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '#/components/ui/navigation-menu';

import { Badge } from '../ui/badge';

// TODO: Create config file(s) for these
const resources: {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
}[] = [
  {
    title: 'Playbooks',
    href: '/learn',
    description:
      'Snappy lessons for quick marketing skills. Think TikTok, but for learning.',
  },
  {
    title: 'Insights',
    href: '/insights',
    description: 'Explore marketing ideas in detail for smarter strategies.',
    disabled: true,
  },
  {
    title: 'Guides',
    href: '/guides',
    description: 'Easy steps to tackle tricky marketing tasks.',
    disabled: true,
  },
  {
    title: 'Blog',
    href: '/blog',
    description:
      'Get the latest in digital marketing, served up hot and fresh.',
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
    href: '/dashboard',
    description:
      'Your marketing operations HQ. All your tools and data at a glance.',
  },
  {
    title: 'Teams',
    href: '/teams',
    description: 'Collaborate and conquer. Teamwork made easy and effective.',
    disabled: true,
  },
  {
    title: 'Learn',
    href: '/learn',
    description:
      'Crush your marketing goals. Lessons, tips, and insider tips await.',
  },
  {
    title: 'Tools',
    href: '/tools',
    description:
      'Supercharge your marketing. AI tools and resources at your fingertips.',
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
    description: 'Need an upgrade? We offer transparent and flexible pricing.',
  },
];

const tools: {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
}[] = [
  {
    title: 'Publish',
    href: '/tools/write',
    description:
      'Create your website in under 3 mins. Fast, easy, and looks great.',
  },
  {
    title: 'Manage Sites',
    href: '/tools/write/sites',
    description:
      'Keep an eye on your sites and draft posts with an AI-assisted editor that helps you protect your IP.',
  },
  {
    title: 'Collaborate',
    href: '/tools/',
    description: 'Invite your team for next-level multiplayer collaboration.',
    disabled: true,
  },
  {
    title: 'AI Experts',
    href: '/tools/chat',
    description: 'Engage with purpose-trained marketing AI that just works.',
    disabled: true,
  },
];

export function MainNavigationMenu() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);
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
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-primary p-6 no-underline outline-none focus:shadow-md"
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
              <ListItem href="/learn" title="Playbooks">
                Stuck? Score quick wins with Playbooks, just 5 mins to wisdom.
              </ListItem>
              <ListItem href="/insights" title="Insights">
                Got bigger challenges? Our Insights and Guides have you covered.
              </ListItem>
              <ListItem href="/tools" title="Tools">
                Engage your audience with our full-stack marketing suite,
                AI-enhanced.
              </ListItem>
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
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={isActive('/learn') ? 'text-primary' : ''}
          >
            <Link href="/learn">Learn</Link>
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
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={isActive('/tools') ? 'text-primary' : ''}
          >
            <Link href="/tools">Tools</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {tools.map((tool) => (
                <ListItem
                  key={tool.title}
                  title={tool.title}
                  href={tool.href}
                  disabled={tool.disabled}
                >
                  {tool.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* TODO: Add link for Admin
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a
              className={navigationMenuTriggerStyle()}
              href="https://discord.com/channels/1151749282806910976/1151825811427561623"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support
            </a>
          </NavigationMenuLink>
              </NavigationMenuItem>*/}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

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
