import { Icons } from '#/components/shared/icons';

// :: Iconography Types ::

export type IconKey = keyof typeof Icons;

// :: Navigation Types ::

export type NavItem = {
  id?: string;
  title: string;
  href: string;
  disabled?: boolean;
  isExternal?: boolean;
  isLoggedIn?: boolean;
  isTeacher?: boolean;
};

export interface SidebarLink {
  href: string;
  label: string;
  icon?: React.ReactElement;
  exact?: boolean;
}

export type MainNavItem = NavItem;

export interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  teamSlug: string;
}

export interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
  apiLimitCount?: number;
  isPaidMember: boolean;
  teamSlug: string;
}

export interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
  isPaidMember: boolean;
  apiLimitCount: number;
}

export interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
  apiLimitCount: number;
  isPaidMember: boolean;
}

// :: Course & Chapter Types ::

export type ChapterType = {
  id: string;
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  userProgress?: { isCompleted: boolean }[];
};

// :: Config Types ::

export type SiteConfig = {
  company: string;
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type FooterConfig = {
  footerNav: MainNavItem[];
};

// :: Stripe and Subscription Types ::

type PlanTitle = 'Good' | 'Better' | 'Best';

interface SubscriptionPlan {
  title: PlanTitle;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
  rateLimit: number;
  models: string[];
  featured?: bollean;
}

export type TeamSubscriptionPlan = SubscriptionPlan & {
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  stripeCurrentPeriodEnd: number | null;
  isPaid: boolean;
  interval: 'month' | 'year' | null;
  isCanceled?: boolean;
};

// :: Miscellaneous Types ::

export type MarketingBenefitsProps = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  emojiDescription: string;
};

// :: Write Types ::

export type DomainVerificationStatusProps =
  | 'Valid Configuration'
  | 'Invalid Configuration'
  | 'Pending Verification'
  | 'Domain Not Found'
  | 'Unknown Error';

// From https://vercel.com/docs/rest-api/endpoints#get-a-project-domain
export interface DomainResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

// From https://vercel.com/docs/rest-api/endpoints#get-a-domain-s-configuration
export interface DomainConfigResponse {
  /** How we see the domain's configuration. - `CNAME`: Domain has a CNAME pointing to Vercel. - `A`: Domain's A record is resolving to Vercel. - `http`: Domain is resolving to Vercel but may be behind a Proxy. - `null`: Domain is not resolving to Vercel. */
  configuredBy?: ('CNAME' | 'A' | 'http') | null;
  /** Which challenge types the domain can use for issuing certs. */
  acceptedChallenges?: ('dns-01' | 'http-01')[];
  /** Whether or not the domain is configured AND we can automatically generate a TLS certificate. */
  misconfigured: boolean;
}

// From https://vercel.com/docs/rest-api/endpoints#verify-project-domain
export interface DomainVerificationResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}
