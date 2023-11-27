import Link from 'next/link';

import { env } from '@/env.mjs';
import { siteConfig } from '@/app/config/site';

import { Icons } from '../shared/icons';

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      'https://api.github.com/repos/and-voila/labs',
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${env.GITHUB_OAUTH_TOKEN}`,
        },
        next: {
          revalidate: 60,
        },
      },
    );

    if (!response?.ok) {
      return null;
    }

    const json = await response.json();

    return parseInt(json['stargazers_count']).toLocaleString();
  } catch (error) {
    return null;
  }
}

const MarketingIndexOpenSource = async () => {
  const stars = await getGitHubStars();

  return (
    <section id="open-source" className="container py-8 md:py-12 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-extrabold leading-[1.1] sm:text-3xl md:text-6xl">
          Building in public
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Embrace the &lsquo;Steal Like an Artist&lsquo; mantra with And Voila.
          We&apos;re not just open source, we&apos;re an open book. Our
          code&apos;s ready for you to swipe, tweak, and make your own on{' '}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
            aria-label="Visit our GitHub page"
          >
            GitHub
          </Link>
          .
        </p>
        {stars && (
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex"
            aria-label="See our GitHub stars"
          >
            <div className="mr-2 flex h-10 w-10 items-center justify-center space-x-2 rounded-md border bg-card">
              <Icons.github className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-center">
              <div className="flex h-10 items-center rounded-md border bg-card px-4 font-medium">
                {stars} stars on GitHub
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};

export default MarketingIndexOpenSource;
