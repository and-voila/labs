import { SVGProps } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

import { APP_BP } from '#/lib/const';
import { cn } from '#/lib/utils';

import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';

interface ToolsDashboardItemProps {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  isExternal?: boolean;
  isDisabled?: boolean;
}

const toolsDashboardItems: ToolsDashboardItemProps[] = [
  {
    title: 'Chat',
    icon: Icons.chat,
    linkHref: `${APP_BP}/tools/chat`,
    linkText: 'Engage Now',
    description:
      'Navigate the maze of marketing with expert-led chatbots. We created the smartest and most effective chatbots for marketing for you.',
    isDisabled: true,
  },
  {
    title: 'Write',
    icon: Icons.pen,
    linkHref: `${APP_BP}/tools/write`,
    linkText: 'Start Writing',
    description:
      "Overcome writer's block with an AI-assist and publish with confidence. Fire up your own blog with a custom domain in minutes.",
  },
  {
    title: 'Optimize',
    icon: Icons.toolbox,
    linkHref: `${APP_BP}/tools/optimize`,
    linkText: 'Boost Performance',
    description:
      "Improve your content's online performance. AI-driven tools for peak SEO efficiency and visual appeal. Breeze through the boring.",
    isDisabled: true,
  },
  {
    title: 'Distribute',
    icon: Icons.paperPlane,
    linkHref: `${APP_BP}/tools/distribute`,
    linkText: 'Spread the Word',
    description:
      "Maximize your content's reach and engagement. Effortless multi-platform distribution to captivate your audience.",
    isDisabled: true,
  },
];

export default async function ToolsDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Tools"
        text="AI-powered tools to assist your workflow. They'll help you save time, safeguard your IP, and crush your ROI."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {toolsDashboardItems.map((item, index) => (
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
              {item.isDisabled ? (
                <button
                  className={cn(
                    buttonVariants({
                      className: 'mt-4 w-full justify-between',
                      variant: 'secondary',
                    }),
                    'cursor-not-allowed opacity-80',
                  )}
                  aria-label={`Link to ${item.title} - ${item.linkText}`}
                  disabled
                >
                  {item.linkText}
                  <Icons.arrowRight
                    className="h-5 w-5 justify-end text-primary"
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
                      className: 'mt-4 w-full justify-between',
                      variant: 'secondary',
                    }),
                  )}
                  aria-label={`Link to ${item.title} - ${item.linkText}`}
                >
                  {item.linkText}
                  <Icons.arrowRight
                    className="h-5 w-5 justify-end text-primary"
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

export function generateMetadata(): Metadata {
  const title = 'AI Tools';
  const description =
    'Discover AI-powered tools for marketers on And Voila. Enhance your workflow, protect IP, and watch your digital marketing ROI soar.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}${APP_BP}/tools`;

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
