import { Suspense } from 'react';

import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import CreateSiteButton from '@/app/components/write/create-site-button';
import CreateSiteModal from '@/app/components/write/modal/create-site';
import PlaceholderCard from '@/app/components/write/placeholder-card';
import Sites from '@/app/components/write/sites';

export default function AllSites({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 md:items-start">
        <DashboardHeader
          heading="My sites"
          text="Express, connect, and grow your brand. Set up your blog quickly with custom domains and AI-driven writing support."
        />
        <CreateSiteButton>
          <CreateSiteModal />
        </CreateSiteButton>
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
        {/* @ts-expect-error Server Component */}
        <Sites siteId={decodeURIComponent(params.id)} />
      </Suspense>
    </DashboardShell>
  );
}
