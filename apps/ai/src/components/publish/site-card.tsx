import { env } from '#/env';

import type { Site } from '@prisma/client';

import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@av/ui/card';
import { Icons } from '@av/ui/icons';
import { APP_BP } from '@av/utils';

import { placeholderBlurhash } from '#/lib/utils';

import BlurImage from '#/components/publish/blur-image';

interface SiteCardProps {
  data: Site;
  teamSlug: string;
}

export default function SiteCard({ data, teamSlug }: SiteCardProps) {
  const url = `${data.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  return (
    <div className="group w-72 rounded-xl border bg-card pb-6 shadow">
      <Link href={`${APP_BP}/${teamSlug}/workspace/publish/site/${data.id}`}>
        <Card key={data.name} className=" border-transparent shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex flex-row items-center justify-between">
              <BlurImage
                width={48}
                height={48}
                src={data.logo ?? '/default-site-logo.jpg'}
                alt=""
                className="h-8 w-8 flex-none rounded-full transition-colors group-hover:grayscale"
                placeholder="blur"
                blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
              />
              <Icons.browser className="h-5 w-5 text-alternate" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="truncate text-lg font-semibold transition-colors group-hover:text-foreground">
              {data.name}
            </p>
          </CardContent>
        </Card>
      </Link>
      <div className="flex w-full justify-between space-x-4 px-6">
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${data.subdomain}.localhost:3001`
          }
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${data.name} in a new tab`}
          className="truncate rounded-md pb-1 text-xs text-muted-foreground underline underline-offset-4 transition-colors group-hover:text-foreground"
        >
          <span className="flex flex-row items-center gap-1">
            {url}
            {''}
            <Icons.arrowSquareOut className="ml-1 h-3 w-3 text-alternate" />
          </span>
        </a>
      </div>
    </div>
  );
}
