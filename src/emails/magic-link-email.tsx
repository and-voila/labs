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
    <Preview>
      Step into the world of smarter digital marketing with And Voila.
    </Preview>
    <Tailwind>
      <Body className="bg-[#dcdfe5] py-[24px] font-sans">
        <Container className="mx-auto rounded-lg bg-[#ffffff] px-[24px] pt-[36px]">
          <Img
            src={`${SITE_URL}/and-voila-logo.png`}
            width="150"
            height="34"
            alt="A colored logomark with an ampersand and exclamation icon and the the Voila"
            className="mx-auto justify-center"
          />
          <Hr className="border-t-1 mt-[16px] border-[#a18ef7]" />
          <Text className="mt-[40px] text-[22px] leading-[28px] text-[#61636b]">
            🌺 Aloha,
          </Text>
          <Text className="text-[22px] leading-[28px] text-[#61636b]">
            We&apos;re excited to have you join us. Just one more click and
            you&apos;re in.{' '}
            {mailType === 'login' ? 'Log in' : 'Activate your account'} with the
            button below.
          </Text>
          <Section className="mt-[48px] text-center">
            <Button
              className="inline-block w-[85%] rounded-md bg-[#6032ec] px-[32px] py-[16px] text-[22px] leading-[28px] text-[#ffffff] no-underline"
              href={actionUrl}
            >
              {mailType === 'login' ? 'Log In' : 'Activate Account'}
            </Button>
          </Section>
          <Text className="text-center text-[12px] text-[#61636b]">
            Expires in 24 hours and is a one-time pass.
          </Text>
          <Hr className="border-t-1 mt-[48px] border-[#a18ef7]" />
          <Text className="mt-[40px] text-[12px] text-[#61636b]">
            We sent you this email because you asked for a magic link. If it
            wasn&apos;t you, please ignore it.
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
