import * as React from 'react';

import { ModeToggle } from '@/app/components/layout/mode-toggle';
import { Icons } from '@/app/components/shared/icons';
import BlurImage from '@/app/components/write/blur-image';
import ReportAbuse from '@/app/components/write/report-abuse';
import { cn, placeholderBlurhash } from '@/app/lib/utils';

interface DomainsFooterLinkData {
  href: string;
  label: string;
  ariaLabel: string;
  preText?: string;
}

interface DomainsFooterProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  logo?: string;
}

const getCopyright = (name: string) => {
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const copyrightName = name || '';
  return `© ${startYear}${
    currentYear > startYear ? `-${currentYear}` : ''
  } ${copyrightName}${
    copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''
  } All rights reserved.`;
};

const DomainsFooterLink: React.FC<DomainsFooterLinkData> = ({
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
        className="font-medium text-brand hover:underline hover:underline-offset-4"
      >
        {label}
      </a>
    </p>
  </>
);

const links: DomainsFooterLinkData[] = [
  {
    href: 'https://labs.andvoila.gg',
    label: 'And Voila',
    ariaLabel: "Navigate to And Voila's registration page in a new window",
    preText: 'Create your own free site on ',
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

export function DomainsFooter({ className, name, logo }: DomainsFooterProps) {
  return (
    <footer className={`${cn(className)} border-t border-brand bg-card`}>
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 text-sm md:flex-row md:gap-2 md:px-0">
          {logo ? (
            <BlurImage
              src={logo}
              className="mr-2 h-6 w-6"
              width={40}
              height={40}
              alt={name}
              placeholder="blur"
              blurDataURL={placeholderBlurhash}
              role="img"
            />
          ) : (
            <Icons.logo className="mr-2 h-7 text-brand" />
          )}
          <p>{getCopyright(name)}</p>
          {links.map((link) => (
            <DomainsFooterLink key={link.href} {...link} />
          ))}
        </div>
        <ReportAbuse />
        <ModeToggle />
      </div>
    </footer>
  );
}
