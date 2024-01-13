import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { SITE_URL } from '#/lib/const';

type MagicLinkEmailProps = {
  actionUrl: string;
  mailType: 'login' | 'register';
  siteName: string;
};

export const MagicLinkEmail = ({
  actionUrl,
  mailType,
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Here&apos;s the magic link you requested from And Voila.</Preview>
    <Tailwind>
      <Body className="bg-[#B4B4B4] py-[24px] font-sans">
        <Container className="mx-auto rounded-lg bg-[#F8F9FB] px-[24px] pt-[36px]">
          <Img
            src={`${SITE_URL}/and-voila-logo.png`}
            width="150"
            height="34"
            alt="A colored logomark with an ampersand and exclamation icon and the the Voila"
            className="mx-auto justify-center"
          />
          <Hr className="border-t-1 mt-[16px] border-[#d20f9a]" />
          <Text className="mt-[40px] text-[22px] leading-[28px] text-[#6E6E6E]">
            🌺 Aloha,
          </Text>
          {mailType === 'login' ? (
            <Text className="text-[22px] leading-[28px] text-[#6E6E6E]">
              We&apos;re excited to have you back. Click the button below to log
              in.
            </Text>
          ) : (
            <Text className="text-[22px] leading-[28px] text-[#6E6E6E]">
              We&apos;re thrilled to welcome you aboard. Just one more click and
              you&apos;re in. Activate your account with the button below.
            </Text>
          )}
          <Section className="mt-[48px] text-center">
            <Button
              className="inline-block w-[85%] rounded-md bg-[#18A300] px-[32px] py-[16px] text-[22px] leading-[28px] text-[#F8F9FB] no-underline"
              href={actionUrl}
            >
              {mailType === 'login' ? 'Log In' : 'Activate Account'}
            </Button>
          </Section>
          <Text className="text-center text-[12px] text-[#6E6E6E]">
            This link will expire in 24 hours and is for one-time use only.
          </Text>
          <Hr className="border-t-1 mt-[48px] border-[#d20f9a]" />
          <Text className="mt-[40px] text-[12px] text-[#6E6E6E]">
            If you didn&apos;t request this magic link, feel free to disregard
            this email.
          </Text>
          <Text className="text-[12px]">
            <span className="font-bold">BRIL.LA, LLC.</span> 1370 N. St. Andrews
            Place, Los Angeles, CA 90028
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default MagicLinkEmail;
