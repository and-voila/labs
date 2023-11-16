// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Link from 'next/link';
import { Insight } from 'contentlayer/generated';

import { Icons } from '@/app/components/shared/icons';
import { buttonVariants } from '@/app/components/ui/button';
import { insightsConfig } from '@/app/config/insights';
import { cn } from '@/app/lib/utils';

interface InsightsPagerProps {
  insight: Insight;
}

export function InsightsPager({ insight }: InsightsPagerProps) {
  const pager = getPagerForInsight(insight);

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <Link
          href={pager.prev.href}
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <Icons.caretLeft className="mr-2 h-4 w-4 text-brand" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: 'outline' }), 'ml-auto')}
        >
          {pager.next.title}
          <Icons.caretRight className="ml-2 h-4 w-4 text-brand" />
        </Link>
      )}
    </div>
  );
}

export function getPagerForInsight(insight: Insight) {
  const flattenedLinks = [null, ...flatten(insightsConfig.sidebarNav), null];
  const activeIndex = flattenedLinks.findIndex(
    (link) => insight.slug === link?.href,
  );
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: { items? }[]) {
  return links.reduce((flat, link) => {
    return flat.concat(link.items ? flatten(link.items) : link);
  }, []);
}
