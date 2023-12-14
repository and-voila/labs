import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { SITE_URL } from '#/lib/utils';

export const TemplateName = 'team-invite-email';

const subject = "You've been invited to a team";

export type EmailVerificationLinkEmailProps = {
  appName: string;
  link: string;
  teamName: string;
  invitedBy: string;
};

export const Template = ({
  link,
  appName,
  teamName,
  invitedBy,
}: EmailVerificationLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>{subject}</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto bg-[#dcdfe5] font-sans">
        <Container className="mx-auto my-[40px] w-[465px] border-separate rounded border border-solid border-[#eaeaea] p-[20px]">
          <Img
            src={`${SITE_URL}/and-voila-logo.png`}
            width="150"
            height="34"
            alt="A colored logomark with an ampersand and exclamation icon and the the Voila"
            className="mx-auto justify-center"
          />
          <Text className="text-[14px] leading-[24px] text-black">👋🏾 Hey,</Text>
          <Text className="text-[14px] leading-[24px] text-black">
            <strong>{invitedBy}</strong> has invited you to the{' '}
            <strong>{teamName}</strong> team on <strong>{appName}</strong>.
          </Text>
          <Section className="mb-[32px] mt-[32px] text-center">
            <Button
              className="inline-block w-[85%] rounded-md bg-[#6032ec] px-[32px] py-[16px] text-[22px] leading-[28px] text-[#ffffff] no-underline"
              href={link}
            >
              Join the team
            </Button>
          </Section>
          <Text className="!text-[14px] leading-[24px] text-black">
            or copy and paste this URL into your browser:{' '}
            <Link href={link} className="text-blue-600 no-underline">
              {link}
            </Link>
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            If you didn&apos;t initiate this request, you can ignore this email.
          </Text>
          <Hr className="border-t-1 mt-[48px] border-[#a18ef7]" />
          <Text className="mt-[40px] text-[12px] text-[#61636b]">
            <span className="font-bold">BRIL.LA, LLC.</span> 1370 N. St. Andrews
            Place, Los Angeles, CA 90028
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
