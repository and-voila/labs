import { SVGProps } from 'react';
import { Metadata, NextPage } from 'next';
import Link from 'next/link';

import { CP_PREFIX } from '#/lib/const';
import { getTeams } from '#/lib/team/get-teams';
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

interface Props {
  params: {
    team_slug: string;
  };
}

const TeamIndex: NextPage<Props> = async (props) => {
  const { params } = props;

  interface TeamIndexItemProps {
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
    isExternal?: boolean;
    isDisabled?: boolean;
  }

  const teamIndexItems: TeamIndexItemProps[] = [
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
      linkHref: `${CP_PREFIX}/${params.team_slug}/learn`,
      linkText: 'Crush it',
      description:
        'Unlock daily micro-courses that supercharge your marketing game. Boost your ROI in less than 5 minutes.',
    },
    {
      title: 'Tools',
      icon: Icons.robot,
      linkHref: `${CP_PREFIX}/tools`,
      linkText: 'Hack it',
      description:
        'Launch your own website in under 3 minutes with a custom domain and smash writer’s block with an AI-assist.',
    },
  ];

  const { teams } = await getTeams();

  const activeTeam = teams.find((team) => team.slug === params.team_slug);
  const teamName = activeTeam ? activeTeam.name : '';

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Team ${teamName} in action`}
        text={
          'Build, boost, and bloom. Launch sites, tap into AI, and amplify your reach, right here while protecting your IP. Stand out from the generative noise.'
        }
      />

      <div
        className={cn(
          'grid w-full gap-6',
          'grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
        )}
      >
        {teamIndexItems.map((item, index) => (
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
              <CardDescription>{item.description}</CardDescription>
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
};

export default TeamIndex;

export function generateMetadata(): Metadata {
  const title = 'Team Dashboard';
  const description =
    "For teams that thrive together, And Voila's collaborative team workspaces are your hub for marketing playbooks and full-stack multiplayer AI tools.";

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/${CP_PREFIX}`;

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
