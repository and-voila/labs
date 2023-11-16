import { InsightsConfig } from '@/app/lib/types';

export const insightsConfig: InsightsConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      isLoggedIn: true,
    },
    {
      title: 'Admin',
      href: '/admin',
      isTeacher: true,
    },
    {
      title: 'Playbooks',
      href: '/learn',
    },
    {
      title: 'Tools',
      href: '/tools',
      disabled: true,
    },
    {
      title: 'Insights',
      href: '/insights',
      disabled: true,
    },
    {
      title: 'Guides',
      href: '/guides',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/insights',
        },
      ],
    },
    {
      title: 'Artifical Intelligence',
      items: [
        {
          title: 'Intro to AI',
          href: '/insights/documentation',
        },
        {
          title: 'ChatGPT vs. Bard',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Protecting IP',
          href: '/insights/documentation/components',
        },
        {
          title: 'Awesome prompts',
          href: '/insights/documentation/code-blocks',
        },
        {
          title: 'Cool hacks',
          href: '/insights/documentation/style-guide',
        },
      ],
    },
    {
      title: 'Business',
      items: [
        {
          title: 'Starting up',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Software we use',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Hiring',
          href: '/insights/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Content',
      items: [
        {
          title: 'Introduction',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Layouts',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Server Components',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Authentication',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Database with Prisma',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'API Routes',
          href: '/insights/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Design',
      items: [
        {
          title: 'Introduction',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Layouts',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Server Components',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Authentication',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Database with Prisma',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'API Routes',
          href: '/insights/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Social',
      items: [
        {
          title: 'Introduction',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Layouts',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Server Components',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Authentication',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'Database with Prisma',
          href: '/insights/in-progress',
          disabled: true,
        },
        {
          title: 'API Routes',
          href: '/insights/in-progress',
          disabled: true,
        },
      ],
    },
  ],
};
