/* eslint-disable @typescript-eslint/no-unused-vars */

import Link from 'next/link';
import { MAX_FREE_TOKENS } from '@/constants';

import { buttonVariants } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { isTeacher } from '@/app/lib/teacher';
import { cn } from '@/app/lib/utils';

interface FreeCounterProps {
  apiLimitCount: number;
  isPaidMember: boolean;
  userId: string;
}

export const FreeCounter = ({
  apiLimitCount = 0,
  isPaidMember = false,
  userId,
}: FreeCounterProps) => {
  if (isPaidMember) {
    return null;
  }

  if (isTeacher(userId)) {
    return null;
  }

  return (
    <div>
      <Card className="border bg-card">
        <CardContent className="py-4">
          <div className="mb-4 space-y-2 text-center text-xs text-foreground">
            <h2 className="text-lg font-bold uppercase text-foreground">
              Get Early Access
            </h2>
            <p className="text-muted-foreground">
              You&apos;re on the free Good plan. Upgrade for some real magic.
            </p>
            {/*<p>
              You&apos;ve used {apiLimitCount} / {MAX_FREE_TOKENS} AI tokens.
            </p>
            <Progress
              value={(apiLimitCount / MAX_FREE_TOKENS) * 100}
              className="h3"
            />*/}
          </div>
          <Link href="/pricing" className={cn(buttonVariants(), 'w-full')}>
            Upgrade
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
