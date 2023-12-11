import * as React from 'react';

import { siteConfig } from '#/config/site';

import { cn } from '#/lib/utils';

import { ModeToggle } from '#/components/layout/mode-toggle';
import { Icons } from '#/components/shared/icons';

interface FooterLinkData {
  href: string;
  label: string;
  ariaLabel: string;
  preText?: string;
}

const getCopyright = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const copyrightName = siteConfig.company || siteConfig.name || '';
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
}) => (
  <>
    <hr className="mx-1 hidden h-4 w-[1px] border-l md:inline-block" />
    <p className="mr-1 md:ml-auto">
      {preText && <span>{preText}</span>}
      <a
        href={href}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener"
        className="font-medium text-primary hover:underline hover:underline-offset-4"
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
    href: 'https://andvoila.gg/privacy',
    label: 'Privacy Policy',
    ariaLabel:
      "Navigate to And Voila's Privacy Policy page on their main website in a new window.",
  },
  {
    href: 'https://andvoila.gg/terms',
    label: 'Terms of Service',
    ariaLabel:
      "Navigate to And Voila's Terms of Service page on their main website in a new window.",
  },
  {
    href: 'https://andvoila.gg/accessibility',
    label: 'Accessibility',
    ariaLabel:
      "Navigate to And Voila's Accessibility statement page on their main website in a new window.",
  },
];

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={`${cn(className)} border-t border-primary bg-card`}>
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 text-sm md:flex-row md:gap-2 md:px-0">
          <Icons.logo className="mr-2 h-7 text-primary" />
          <p>{getCopyright()}</p>
          {links.map((link) => (
            <FooterLink key={link.href} {...link} />
          ))}
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
