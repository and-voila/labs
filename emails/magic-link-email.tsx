import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { Icons } from '../app/components/shared/icons';

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
      <Body className="bg-gray-300 py-6 font-sans">
        <Container className="mx-auto rounded-lg bg-white px-6 py-4">
          <Icons.logo className="mx-auto block h-10 w-10 pb-6 text-violet-800" />
          <Hr className="border-t-1 border-violet-300 py-3" />
          <Text className="mt-10 text-xl text-gray-600">🌺 Aloha,</Text>
          <Text className="text-xl text-gray-600">
            We&apos;re excited to have you on board at And Voila. Just one more
            click and you&apos;re in.{' '}
            {mailType === 'login' ? 'Log in' : 'Activate your account'} with the
            magic button below.
          </Text>
          <Section className="mt-12 text-center">
            <Button
              className="inline-block w-3/4 rounded-md bg-violet-600 px-8 py-4 text-xl text-white no-underline"
              href={actionUrl}
            >
              {mailType === 'login' ? 'Log In' : 'Activate Account'}
            </Button>
          </Section>
          <Text className="text-center text-xs text-gray-600">
            Expires in 24 hours and is a one-time pass.
          </Text>
          <Hr className="border-t-1 mt-12 border-violet-300" />
          <Text className="mt-10 text-xs text-gray-600">
            We sent you this email because you asked for a magic link. If it
            wasn&apos;t you, please ignore it.
          </Text>
          <Text className="text-xs">
            <span className="font-bold">BRIL.LA, LLC.</span> 1370 N. St. Andrews
            Place, Los Angeles, CA 90028
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default MagicLinkEmail;
