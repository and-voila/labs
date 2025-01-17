import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { APP_BP } from '@av/utils';

const textClass = 'text-[18px] leading-[26px] text-[#6E6E6E]';
const linkClass = 'font-semibold text-[#d20f9a] underline underline-offset-4';

export interface WelcomeEmailProps {
  siteUrl: string;
}

export const WelcomeEmail = ({ siteUrl }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Dive into your And Voila journey, we&apos;re going to have some marketing
      together.
    </Preview>
    <Tailwind>
      <Body className="bg-[#B4B4B4] py-[24px] font-sans">
        <Container className="mx-auto rounded-lg bg-[#F8F9FB] px-[24px] pt-[36px]">
          <Img
            src={`${siteUrl}/and-voila-logo.png`}
            width="150"
            height="34"
            alt="And Voila Logo"
            className="mx-auto justify-center"
          />
          <Hr className="border-t-1 my-[16px] border-[#D20F9A]" />
          <Text className="mt-[40px] text-[18px] leading-[26px] text-[#6E6E6E]">
            🎉 Welcome!
          </Text>
          <Text className={textClass}>
            Our team has been brewing up decades of marketing expertise into
            something special just for you. Ready to unlock your marketing
            superpowers?
          </Text>
          <Section className="mt-[48px] text-center">
            <Button
              className="inline-block w-[75%] rounded-md bg-[#18A300] px-[32px] py-[16px] text-[18px] leading-[26px] text-[#ffffff] no-underline"
              href={`${siteUrl}${APP_BP}/my/workspaces`}
            >
              Dive Right In
            </Button>
          </Section>
          <Hr className="border-t-1 mb-[24px] mt-[48px] border-[#D20F9A]" />
          <Heading as="h3">Quick Start Tips</Heading>
          <Text className={textClass}>
            Start your journey in our Discord{' '}
            <Link
              className={linkClass}
              href="https://discord.com/channels/1151749282806910976/1154115151407091862"
            >
              Community
            </Link>
            . It&apos;s buzzing with ideas, insights, and fellow marketing
            adventurers.
          </Text>
          <Text className={textClass}>
            Eager to share your voice?{' '}
            <Link
              className={linkClass}
              href={`${siteUrl}${APP_BP}/my/workspaces`}
            >
              Create your site
            </Link>{' '}
            and let your ideas take flight. Our AI-assisted editor is here to
            banish writer&apos;s block. Need a hand? Our{' '}
            <Link
              className={linkClass}
              href="https://discord.com/channels/1151749282806910976/1151825811427561623"
            >
              Discord Support
            </Link>{' '}
            team is always ready to help. Just give us a shout!
          </Text>
          <Text className={textClass}>
            Our Good plan is free-for-life and includes generous limits. If you
            find yourself needing more, you can{' '}
            <Link className={linkClass} href={`${siteUrl}/pricing`}>
              upgrade
            </Link>{' '}
            upgrade at any time and{' '}
            <span className="font-bold">enjoy 50% off</span> as an early-access
            member. Your membership is covered by our 100% delight guarantee.
          </Text>
          <Text className={textClass}>— 🫶🏽 The And Voila Team</Text>
          <Hr className="border-t-1 mt-[48px] border-[#D20F9A]" />
          <Text className="mt-[16px] text-[12px] text-[#6E6E6E]">
            You&apos;re receiving this email as part of your And Voila journey.
            If this isn&apos;t you, just ignore us.
          </Text>
          <Text className="text-[12px] text-[#6E6E6E]">
            <span className="font-bold">BRIL.LA, LLC.</span> 1370 N. St. Andrews
            Place, Los Angeles, CA 90028
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default WelcomeEmail;
