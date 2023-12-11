import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

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
      <Body className="mx-auto my-auto bg-white font-sans">
        <Container className="mx-auto my-[40px] w-[465px] border-separate rounded border border-solid border-[#eaeaea] p-[20px]">
          <Section className="mt-[32px]">LOGO</Section>
          <Text className="text-[14px] leading-[24px] text-black">
            Hey there,
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            <strong>{invitedBy}</strong> has invited you to the{' '}
            <strong>{teamName}</strong> team on <strong>{appName}</strong>.
          </Text>
          <Section className="mb-[32px] mt-[32px] text-center">
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
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
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
