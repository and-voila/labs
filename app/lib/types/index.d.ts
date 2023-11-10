import { Icons } from '@/app/components/shared/icons';

// :: Iconography Types ::

export type SocialIcon = keyof typeof Icons;

export type SocialItem = {
  name: string;
  href: string;
  icon: SocialIcon;
};

export type SocialConfig = {
  social: SocialItem[];
};

export type IconKey = keyof typeof Icons;

// :: Navigation Types ::

export type Route = {
  id: string;
  icon?: IconName;
  label: string;
  href: string;
};

export type NavItem = {
  id?: string;
  title: string;
  href: string;
  disabled?: boolean;
  isExternal?: boolean;
  isLoggedIn?: boolean;
  isTeacher?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  id?: string;
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export interface SidebarItemProps {
  icon: keyof typeof Icons;
  label: string;
  href: string;
}

export interface SidebarProps {
  apiLimitCount: number;
  isPaidMember: boolean;
}

export interface MobileSidebarProps {
  apiLimitCount: number;
  isPaidMember: boolean;
}

export interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
  apiLimitCount: number;
  isPaidMember: boolean;
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

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type FooterConfig = {
  footerNav: MainNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

// :: Stripe and Subscription Types ::

export type SubscriptionPlan = {
  title: string;
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
};

export type UserSubscriptionPlan = SubscriptionPlan & {
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
