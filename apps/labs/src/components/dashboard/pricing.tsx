// TODO: work in progress

'use client';

import { useCallback, useState } from 'react';

import { Icons } from '#/components/shared/icons';
import { Switch } from '#/components/ui/switch';

interface Frequency {
  value: string;
  label: string;
}

interface Price {
  monthly: number;
  yearly: number;
}

interface Tier {
  title: string;
  featured: boolean;
  description: string;
  prices: Price;
  benefits: string[];
}

type FeatureTier = Record<string, boolean | string>;

interface Feature {
  title: string;
  tiers: FeatureTier;
}

interface Section {
  title: string;
  features: Feature[];
}

const frequencies: Frequency[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Annually' },
];
const tiers: Tier[] = [
  {
    title: 'Good',
    featured: false,
    description:
      'Free for life. Get started with the essentials for your digital marketing journey.',
    prices: { monthly: 0, yearly: 0 },
    benefits: [
      'Launch your digital presence',
      'AI-powered content creation',
      'Protect your creative IP',
      'Access to expert-led learning',
      'Community engagement on Discord',
      'Responsive support',
    ],
  },
  {
    title: 'Better',
    featured: true,
    description:
      'Power up your marketing with advanced collaboration and AI capabilities.',
    prices: { monthly: 49, yearly: 480 },
    benefits: [
      'Everything in Good',
      'Expand with multiple sites',
      'Design customizations',
      'Collaborate in real-time',
      'Enhanced AI for content and SEO',
      'All access learning pass',
    ],
  },
  {
    title: 'Best',
    featured: false,
    description:
      'Unlock the full potential of our marketing suite with the highest AI limits and exclusive access.',
    prices: { monthly: 99, yearly: 950 },
    benefits: [
      'Everything in Better',
      'Unlimited websites and collaborators',
      'Advanced AI insights and analytics',
      'Early access to new features',
      'Exclusive savings and VIP events',
      '24/7 premium support',
    ],
  },
];
const sections: Section[] = [
  {
    title: 'Publish',
    features: [
      {
        title: 'Websites',
        tiers: {
          Good: '1',
          Better: '5',
          Best: '∞',
        },
      },
      {
        title: 'Custom domains',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'AI-assisted editor',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'AI-assisted graphics',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'IP Protection',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'Lightning fast loads',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'Built-in SEO',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'AI credits',
        tiers: { Good: '500', Better: '1500', Best: '3500' },
      },
      {
        title: 'AI-assisted SEO',
        tiers: { Good: false, Better: true, Best: true },
      },

      {
        title: 'Real-time multiplayer',
        tiers: { Good: false, Better: true, Best: true },
      },
      {
        title: 'Collaborative editor',
        tiers: { Good: false, Better: true, Best: true },
      },
      {
        title: 'Multiplayer AI chat',
        tiers: { Good: false, Better: true, Best: true },
      },
      {
        title: 'Design customization',
        tiers: { Good: false, Better: true, Best: true },
      },
      {
        title: 'Collaborators',
        tiers: {
          Good: false,
          Better: '5',
          Best: '∞',
        },
      },
      {
        title: 'Guests',
        tiers: { Good: false, Better: false, Best: true },
      },
    ],
  },
  {
    title: 'Share',
    features: [
      {
        title: 'Social sharing',
        tiers: { Good: false, Better: true, Best: true },
      },
      {
        title: 'AI-assisted drafts',
        tiers: { Good: false, Better: true, Best: true },
      },
      {
        title: 'Email',
        tiers: { Good: false, Better: true, Best: true },
      },
      {
        title: 'Email scheduling',
        tiers: { Good: false, Better: true, Best: true },
      },
      {
        title: 'Social networks',
        tiers: {
          Good: false,
          Better: '5',
          Best: '∞',
        },
      },
    ],
  },
  {
    title: 'Learn',
    features: [
      {
        title: 'Daily playbooks',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'Expert created content',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'Connecting all the dots',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'Daily releases',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'Full library access',
        tiers: { Good: false, Better: true, Best: true },
      },
      {
        title: 'Topic requests',
        tiers: { Good: false, Better: true, Best: true },
      },
    ],
  },
  {
    title: 'Community',
    features: [
      {
        title: 'Private Discord community',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'Highly-moderated safe space',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'Monthly AMAs',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: 'Channels',
        tiers: {
          Good: '10',
          Better: '∞',
          Best: '∞',
        },
      },
      {
        title: 'Expert AMA channels',
        tiers: { Good: false, Better: true, Best: true },
      },
      {
        title: 'VIP events',
        tiers: { Good: false, Better: false, Best: true },
      },
    ],
  },
  {
    title: 'Support',
    features: [
      {
        title: 'Obsessive support',
        tiers: { Good: true, Better: true, Best: true },
      },
      {
        title: '100% Delight Guarantee',
        tiers: { Good: true, Better: true, Best: true },
      },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardPricing() {
  const [frequency, setFrequency] = useState(frequencies[0]);
  const handleFrequencyChange = useCallback(() => {
    setFrequency(
      frequencies.find((f) => f.value !== frequency?.value) ?? frequencies[0],
    );
  }, [frequency, setFrequency]);

  return (
    <div className="isolate overflow-hidden">
      <div className="flow-root pb-16 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative z-10">
            <div className="mt-8 flex justify-center">
              <span className="mr-4 text-sm text-muted-foreground">
                Monthly
              </span>
              <Switch
                checked={frequency?.value === 'yearly'}
                onCheckedChange={handleFrequencyChange}
                role="switch"
                aria-label="switch-year"
              />
              <span className="ml-4 text-sm text-muted-foreground">Annual</span>
            </div>
          </div>
          <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3">
            <div
              className="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:ring-1 lg:ring-border"
              aria-hidden="true"
            />
            {tiers.map((tier) => (
              <div
                key={tier.title}
                className={classNames(
                  tier.featured
                    ? 'z-10 bg-card shadow-xl ring-1 ring-border'
                    : 'ring-1 ring-border lg:pb-14 lg:ring-0',
                  'relative rounded-2xl',
                )}
              >
                <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                  <h3
                    id={tier.title}
                    className={classNames(
                      tier.featured ? 'text-primary' : 'text-primary/80',
                      'text-sm font-medium uppercase leading-6 tracking-widest',
                    )}
                  >
                    {tier.title}
                  </h3>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                    <div className="mt-2 flex items-center gap-x-4">
                      <p
                        className={classNames(
                          tier.featured
                            ? 'text-foreground'
                            : 'text-foreground/70',
                          'text-6xl font-bold tracking-tight',
                        )}
                      >
                        {frequency?.value === 'yearly' &&
                        tier.prices.monthly > 0 ? (
                          <>
                            <span>${Math.floor(tier.prices.yearly / 12)}</span>
                          </>
                        ) : tier.prices.monthly > 0 ? (
                          `$${tier.prices.monthly}`
                        ) : (
                          'Free'
                        )}
                      </p>
                      <div className="text-xs leading-5">
                        <p
                          className={
                            tier.featured
                              ? 'text-foreground'
                              : 'text-muted-foreground'
                          }
                        >
                          per active member
                        </p>
                        <p
                          className={
                            tier.featured
                              ? 'text-muted-foreground'
                              : 'text-muted-foreground/80'
                          }
                        >{`Billed ${frequency?.value}`}</p>
                      </div>
                    </div>
                    <button
                      aria-describedby={tier.title}
                      className={classNames(
                        tier.featured
                          ? 'bg-primary text-white shadow-sm hover:bg-primary/80 focus-visible:outline-primary'
                          : 'hover/20 bg-secondary focus-visible:outline-white',
                        'rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                      )}
                    >
                      Buy this plan
                    </button>
                  </div>
                  <div className="mt-8 flow-root sm:mt-10">
                    <ul
                      className={classNames(
                        tier.featured
                          ? 'divide-gray-900/5 border-gray-900/5 text-foreground'
                          : 'divide-white/5 border-white/5 text-muted-foreground',
                        '-my-2 divide-y border-t text-sm leading-6 lg:border-t-0',
                      )}
                    >
                      {tier.benefits.map((mainFeature) => (
                        <li key={mainFeature} className="flex gap-x-3 py-2">
                          <Icons.check
                            className={classNames(
                              tier.featured ? 'text-primary' : 'text-gray-500',
                              'h-6 w-5 flex-none',
                            )}
                            aria-hidden="true"
                          />
                          {mainFeature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative rounded-t-2xl bg-muted lg:pt-14">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            {/* Feature comparison (up to lg) */}
            <section
              aria-labelledby="mobile-comparison-heading"
              className="lg:hidden"
            >
              <h2 id="mobile-comparison-heading" className="sr-only">
                Feature comparison
              </h2>

              <div className="mx-auto max-w-2xl space-y-16">
                {tiers.map((tier) => (
                  <div key={tier.title} className="border-t">
                    <div
                      className={classNames(
                        tier.featured ? 'border-primary' : 'border-transparent',
                        '-mt-px w-72 border-t-2 pt-10 md:w-80',
                      )}
                    >
                      <h3 className="text-sm font-medium uppercase leading-6 tracking-widest text-primary">
                        {tier.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {tier.description}
                      </p>
                    </div>

                    <div className="mt-10 space-y-10">
                      {sections.map((section) => (
                        <div key={section.title}>
                          <h4 className="text-sm font-semibold leading-6 text-alternate">
                            {section.title}
                          </h4>
                          <div className="relative mt-6">
                            {/* Fake card background */}
                            <div
                              aria-hidden="true"
                              className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg shadow-sm sm:block"
                            />

                            <div
                              className={classNames(
                                tier.featured
                                  ? 'ring-2 ring-primary'
                                  : 'ring-1 ring-border',
                                'relative rounded-lg bg-background shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0',
                              )}
                            >
                              <dl className="divide-y divide-border text-sm leading-6">
                                {section.features.map((feature) => (
                                  <div
                                    key={feature.title}
                                    className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                                  >
                                    <dt className="pr-4 text-muted-foreground">
                                      {feature.title}
                                    </dt>
                                    <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                      {typeof feature.tiers[tier.title] ===
                                      'string' ? (
                                        <span
                                          className={
                                            tier.featured
                                              ? 'font-semibold text-primary'
                                              : 'text-muted-foreground'
                                          }
                                        >
                                          {feature.tiers[tier.title]}
                                        </span>
                                      ) : (
                                        <>
                                          {feature.tiers[tier.title] ===
                                          true ? (
                                            <Icons.check
                                              className="mx-auto h-5 w-5 text-primary"
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <Icons.crossLarge
                                              className="mx-auto h-5 w-5 text-muted-foreground/80"
                                              aria-hidden="true"
                                            />
                                          )}

                                          <span className="sr-only">
                                            {feature.tiers[tier.title] === true
                                              ? 'Yes'
                                              : 'No'}
                                          </span>
                                        </>
                                      )}
                                    </dd>
                                  </div>
                                ))}
                              </dl>
                            </div>

                            {/* Fake card border */}
                            <div
                              aria-hidden="true"
                              className={classNames(
                                tier.featured
                                  ? 'ring-2 ring-primary'
                                  : 'ring-1 ring-border',
                                'pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block',
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Feature comparison (lg+) */}
            <section
              aria-labelledby="comparison-heading"
              className="hidden lg:block"
            >
              <h2 id="comparison-heading" className="sr-only">
                Feature comparison
              </h2>

              <div className="grid grid-cols-4 gap-x-8 border-t before:block">
                {tiers.map((tier) => (
                  <div key={tier.title} aria-hidden="true" className="-mt-px">
                    <div
                      className={classNames(
                        tier.featured ? 'border-primary' : 'border-transparent',
                        'border-t-2 pt-10',
                      )}
                    >
                      <p className="text-sm font-medium uppercase leading-6 tracking-widest text-primary">
                        {tier.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {tier.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="-mt-6 space-y-16">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-medium uppercase leading-6 tracking-widest text-alternate">
                      {section.title}
                    </h3>
                    <div className="relative -mx-8 mt-10">
                      {/* Fake card backgrounds */}
                      <div
                        className="absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                        aria-hidden="true"
                      >
                        <div className="h-full w-full rounded-lg shadow-sm" />
                        <div className="h-full w-full rounded-lg bg-background shadow-sm" />
                        <div className="h-full w-full rounded-lg shadow-sm" />
                      </div>

                      <table className="relative w-full border-separate border-spacing-x-8">
                        <thead>
                          <tr className="text-left">
                            <th scope="col">
                              <span className="sr-only">Feature</span>
                            </th>
                            {tiers.map((tier) => (
                              <th key={tier.title} scope="col">
                                <span className="sr-only">
                                  {tier.title} tier
                                </span>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.features.map((feature, featureIdx) => (
                            <tr key={feature.title}>
                              <th
                                scope="row"
                                className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-muted-foreground"
                              >
                                {feature.title}
                                {featureIdx !== section.features.length - 1 ? (
                                  <div className="absolute inset-x-8 mt-3 h-px bg-border" />
                                ) : null}
                              </th>
                              {tiers.map((tier) => (
                                <td
                                  key={tier.title}
                                  className="relative w-1/4 px-4 py-0 text-center"
                                >
                                  <span className="relative h-full w-full py-3">
                                    {typeof feature.tiers[tier.title] ===
                                    'string' ? (
                                      <span
                                        className={classNames(
                                          tier.featured
                                            ? 'font-semibold text-primary'
                                            : 'text-foreground',
                                          'text-sm leading-6',
                                        )}
                                      >
                                        {feature.tiers[tier.title]}
                                      </span>
                                    ) : (
                                      <>
                                        {feature.tiers[tier.title] === true ? (
                                          <Icons.check
                                            className="mx-auto h-5 w-5 text-primary"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <Icons.crossLarge
                                            className="mx-auto h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                          />
                                        )}

                                        <span className="sr-only">
                                          {feature.tiers[tier.title] === true
                                            ? 'Yes'
                                            : 'No'}
                                        </span>
                                      </>
                                    )}
                                  </span>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Fake card borders */}
                      <div
                        className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                        aria-hidden="true"
                      >
                        {tiers.map((tier) => (
                          <div
                            key={tier.title}
                            className={classNames(
                              tier.featured
                                ? 'ring-2 ring-primary'
                                : 'ring-1 ring-border',
                              'rounded-lg',
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
