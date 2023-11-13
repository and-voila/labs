import { DocsConfig } from '@/app/lib/types';

export const docsConfig: DocsConfig = {
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
      href: '/docs',
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
          href: '/docs',
        },
      ],
    },
    {
      title: 'Artifical Intelligence',
      items: [
        {
          title: 'Intro to AI',
          href: '/docs/documentation',
        },
        {
          title: 'ChatGPT vs. Bard',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Protecting IP',
          href: '/docs/documentation/components',
        },
        {
          title: 'Awesome prompts',
          href: '/docs/documentation/code-blocks',
        },
        {
          title: 'Cool hacks',
          href: '/docs/documentation/style-guide',
        },
      ],
    },
    {
      title: 'Business',
      items: [
        {
          title: 'Starting up',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Software we use',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Hiring',
          href: '/docs/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Content',
      items: [
        {
          title: 'Introduction',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Layouts',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Server Components',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Authentication',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Database with Prisma',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'API Routes',
          href: '/docs/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Design',
      items: [
        {
          title: 'Introduction',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Layouts',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Server Components',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Authentication',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Database with Prisma',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'API Routes',
          href: '/docs/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Social',
      items: [
        {
          title: 'Introduction',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Layouts',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Server Components',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Authentication',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Database with Prisma',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'API Routes',
          href: '/docs/in-progress',
          disabled: true,
        },
      ],
    },
  ],
};
