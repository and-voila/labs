import { ReactNode } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { fontMapper } from ':/public/fonts';

import { getSiteData } from '#/lib/fetchers';
import { cn, placeholderBlurhash } from '#/lib/utils';

import { DomainsFooter } from '#/components/layout/domains-footer';
import BlurImage from '#/components/write/blur-image';

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const data = await getSiteData(domain);
  if (!data) {
    return null;
  }
  const {
    name: title,
    description,
    logo,
  } = data as {
    name: string;
    description: string;
    image: string;
    logo: string;
  };

  const authorUrl =
    params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    data.customDomain
      ? `https://${data.customDomain}`
      : `https://${domain}`;

  return {
    title,
    description,
    authors: [
      {
        name: title,
        url: authorUrl,
      },
    ],
    openGraph: {
      title,
      description,
      images: [
        {
          url: '/open-graph.jpg',
          width: 1200,
          height: 630,
          alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: '/open-graph.jpg',
          alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
        },
      ],
    },
    icons: [logo],
    metadataBase: new URL(`https://${domain}`),
    // Set canonical URL to custom domain if it exists
    ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
      data.customDomain && {
        alternates: {
          canonical: `https://${data.customDomain}`,
        },
      }),
  };
}

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const domain = decodeURIComponent(params.domain);
  const data = await getSiteData(domain);

  if (!data) {
    notFound();
  }

  // Redirect to custom domain if it exists
  if (
    domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    data.customDomain &&
    process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === 'true'
  ) {
    return redirect(`https://${data.customDomain}`);
  }

  return (
    <div
      className={cn(
        fontMapper[data.font],
        'flex min-h-screen flex-col bg-background',
      )}
    >
      <div className="sticky top-0 z-40 flex h-16 w-full justify-center bg-background/60 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-center space-x-5 px-10 sm:px-20">
          <Link href="/" className="flex items-center justify-center">
            <div className="inline-block h-8 w-8 overflow-hidden rounded-full align-middle">
              <BlurImage
                src={data.logo || ''}
                alt={data.name || ''}
                width={40}
                height={40}
                placeholder="blur"
                blurDataURL={placeholderBlurhash}
                role="img"
              />
            </div>
            <span className="ml-3 inline-block truncate font-title font-medium">
              {data.name}
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-20 flex-grow">{children}</div>

      <div className="flex flex-col">
        <DomainsFooter
          className="mt-20"
          name={data.name || 'BRIL.LA, LLC.'}
          logo={data.logo || undefined}
        />
      </div>
    </div>
  );
}
