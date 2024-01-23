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

export const TemplateName = 'send-abuse-report-email';

const subject = '😱 Abuse Report Notification';

export interface SendAbuseReportEmailProps {
  urlToReport: string;
  siteName: string;
}

export const SendAbuseReportEmail = ({
  urlToReport,
  siteName,
}: SendAbuseReportEmailProps) => (
  <Html>
    <Head />
    <Preview>{subject}</Preview>
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
            Head&apos;s up!
          </Text>
          <Text className="text-[22px] leading-[28px] text-[#6E6E6E]">
            We have received an abuse report for: {siteName}
          </Text>
          <Text className="text-[22px] leading-[28px] text-[#6E6E6E]">
            The reported URL is: {urlToReport}
          </Text>
          <Text className="text-[22px] leading-[28px] text-[#6E6E6E]">
            Review the content and take appropriate action as per our Terms of
            Service.
          </Text>
          <Section className="mt-[48px] text-center">
            <Button
              className="inline-block w-[85%] rounded-md bg-[#18A300] px-[32px] py-[16px] text-[22px] leading-[28px] text-[#F8F9FB] no-underline"
              href={urlToReport}
            >
              View Reported URL
            </Button>
          </Section>
          <Hr className="border-t-1 mt-[48px] border-[#d20f9a]" />
          <Text className="mt-[40px] text-[12px] text-[#6E6E6E]">
            <span className="font-bold">BRIL.LA, LLC.</span> 1370 N. St. Andrews
            Place, Los Angeles, CA 90028
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
