import * as React from 'react';

import { cn } from '@av/ui';
import { Icons } from '@av/ui/icons';

import { siteConfig } from '#/config/site';

import { ModeToggle } from '#/components/layout/mode-toggle';

import SystemStatusWidget from './system-status';

interface FooterLinkData {
  href: string;
  label: string;
  ariaLabel: string;
  preText?: string;
  mobileOnly?: boolean;
  isLocal?: boolean;
}

const getCopyright = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const copyrightName = siteConfig.company ?? siteConfig.name ?? '';
  return `© ${startYear}${
    currentYear > startYear ? `-${currentYear}` : ''
  } ${copyrightName}${
    copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''
  } All rights reserved.`;
};

const FooterLink: React.FC<FooterLinkData> = ({
  href,
  label,
  ariaLabel,
  preText,
  mobileOnly,
  isLocal = false,
}) => (
  <>
    <hr
      className={`mx-1 hidden h-4 w-[1px] border-l lg:inline-block ${mobileOnly ? 'lg:hidden' : ''}`}
    />
    <p className={`mr-1 lg:ml-auto ${mobileOnly ? 'lg:hidden' : ''}`}>
      {preText && <span className="text-sm">{preText}</span>}
      <a
        href={href}
        aria-label={ariaLabel}
        {...(!isLocal && { target: '_blank', rel: 'noopener noreferrer' })}
        className="text-sm font-medium text-primary transition-all hover:text-primary/80 hover:underline hover:underline-offset-4"
      >
        {label}
      </a>
    </p>
  </>
);

const links: FooterLinkData[] = [
  {
    href: 'https://bril.la',
    label: 'BRIL.LA',
    ariaLabel: 'Navigate to BRIL.LA website',
    preText: 'Designed in California by ',
  },
  {
    href: '/pricing',
    label: 'Pricing',
    ariaLabel: 'Navigate to Pricing page.',
    mobileOnly: true,
    isLocal: true,
  },
  {
    href: 'https://andvoila.gg/privacy',
    label: 'Privacy Policy',
    ariaLabel: `Navigate to ${siteConfig.name}'s Privacy Policy page on their main website in a new window.`,
  },
  {
    href: 'https://andvoila.gg/terms',
    label: 'Terms of Service',
    ariaLabel: `Navigate to ${siteConfig.name}'s Terms of Service page on their main website in a new window.`,
  },
  {
    href: 'https://andvoila.gg/accessibility',
    label: 'Accessibility',
    ariaLabel: `Navigate to ${siteConfig.name}'s Accessibility statement page on their main website in a new window.`,
  },
];

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={`${cn(className)}z-40 border-t border-primary bg-card`}>
      <div className="flex w-screen flex-col items-center justify-between gap-4 px-4 py-6 lg:h-16 lg:flex-row lg:py-0">
        <div className="flex flex-col items-center gap-4 px-8 text-sm lg:flex-row lg:gap-2 lg:px-0">
          <Icons.logo className="mr-2 h-7 text-primary" />
          <p>{getCopyright()}</p>
          {links.map((link) => (
            <FooterLink key={link.href} {...link} />
          ))}
          <div className="lg:ml-8">
            <SystemStatusWidget />
          </div>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
