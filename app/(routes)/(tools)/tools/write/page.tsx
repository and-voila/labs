import { Suspense } from 'react';

import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import OverviewSitesCTA from '@/app/components/write/overview-sites-cta';
import PlaceholderCard from '@/app/components/write/placeholder-card';
import Posts from '@/app/components/write/posts';
import Sites from '@/app/components/write/sites';

export default function Overview() {
  return (
    <DashboardShell>
      <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 md:items-start">
        <DashboardHeader
          heading="Write"
          text="Launch your blog in under 3 minutes with a custom domain. Overcome writer's block with our AI-assisted editor."
        />
        <Suspense fallback={null}>
          <OverviewSitesCTA />
        </Suspense>
      </div>

      <div className="my-8 flex flex-col space-y-6">
        <div className="border-b border-brand/70 pb-5">
          <h3 className="text-2xl font-semibold leading-6">Sites</h3>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Sites limit={4} />
        </Suspense>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="border-b border-brand/70 pb-5">
          <h3 className="text-2xl font-semibold leading-6">Recent posts</h3>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Posts limit={8} />
        </Suspense>
      </div>
    </DashboardShell>
  );
}
