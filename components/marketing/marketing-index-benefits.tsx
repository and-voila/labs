import { MarketingBenefitsProps } from '@/types';

const marketingBenefits: MarketingBenefitsProps[] = [
  {
    id: '1',
    title: 'Instant Expertise',
    description:
      'Elevate your marketing game overnight. Get real answers, no fluff, just results.',
    emoji: '🎓',
    emojiDescription: 'A graduation cap emoji',
  },
  {
    id: '2',
    title: 'Micro Mastery',
    description:
      'Laser-focused micro courses. Crush it with new skills in under 5 minutes.',
    emoji: '🔬',
    emojiDescription: 'A microscope emoji',
  },
  {
    id: '3',
    title: 'AI-Boosted Strategies',
    description:
      'Leverage cutting-edge, AI-assisted tools to supercharge your campaigns.',
    emoji: '🤖',
    emojiDescription: 'A robot emoji',
  },
  {
    id: '4',
    title: 'Holistic Solutions',
    description:
      'One-stop shop for your marketing needs. From concept to completion.',
    emoji: '🌐',
    emojiDescription: 'A globe emoji',
  },
  {
    id: '5',
    title: 'Elite Networking',
    description:
      'Rub elbows with industry leaders. Get insights from the best in the business.',
    emoji: '🤝',
    emojiDescription: 'A handshake emoji',
  },
  {
    id: '6',
    title: 'Timely Wisdom',
    description:
      'Your marketing questions answered. Same-day replies from our global team.',
    emoji: '⏰',
    emojiDescription: 'A clock emoji',
  },
  {
    id: '7',
    title: 'ROI Unleashed',
    description:
      'No guesswork. Achieve unparalleled ROI with data-driven strategies.',
    emoji: '📈',
    emojiDescription: 'A line chart emoji',
  },
  {
    id: '8',
    title: 'Build Credibility',
    description:
      'Enhance your industry standing. Become the marketer everyone turns to.',
    emoji: '🏆',
    emojiDescription: 'A trophy emoji',
  },
  {
    id: '9',
    title: 'Skill Evolution',
    description:
      'Outgrow your limitations. Master new marketing skills and technologies.',
    emoji: '🚀',
    emojiDescription: 'A rocketship emoji',
  },
];

const MarketingIndexBenefits = () => {
  return (
    <section
      id="benefits"
      className="container space-y-6 rounded-2xl bg-muted py-8 dark:bg-background md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-extrabold leading-[1.1] sm:text-3xl md:text-6xl">
          Why you&apos;ll love going premium
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Say goodbye to marketing overwhelm and missed KPIs. As a premium
          member, you&apos;ll gain the clarity and expertise you need to execute
          top-notch campaigns and drive ROI through the roof. Get started today,
          no credit card required.
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {marketingBenefits.map((benefit) => (
          <div
            key={benefit.id}
            className="relative overflow-hidden rounded-lg border bg-primary-foreground p-2"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <span
                role="img"
                aria-label={`${benefit.emojiDescription} representing ${benefit.title}`}
                className="h-12 w-12 text-4xl"
              >
                {benefit.emoji}
              </span>
              <div className="space-y-2">
                <h3 className="font-bold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto text-center md:max-w-[58rem]">
        <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Unlock the future of digital marketing with And Voila. Dive into our
          insightful blog and in-depth documentation—your toolkit for becoming
          the go-to marketing pro.
        </p>
      </div>
    </section>
  );
};

export default MarketingIndexBenefits;
