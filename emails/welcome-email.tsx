import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  firstName: string;
  parentName: string;
}

export const WelcomeEmail = ({
  firstName = 'Player',
  parentName = 'Parent',
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to OTG Football Academy Summer Camp!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to OTG Football Academy!</Heading>
        <Text style={text}>Dear {parentName},</Text>
        <Text style={text}>
          Thank you for registering {firstName} for our Summer Football Camp! We're excited to have them join us for an amazing football experience.
        </Text>
        <Section style={section}>
          <Text style={text}>
            We will be in touch shortly with more details about:
          </Text>
          <ul>
            <li>Camp schedule and daily activities</li>
            <li>What to bring</li>
            <li>Important dates and times</li>
            <li>Additional information you need to know</li>
          </ul>
        </Section>
        <Text style={text}>
          If you have any questions in the meantime, please don't hesitate to contact us.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Best regards,<br />
          OTG Football Academy Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#228B22',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '32px',
  margin: '0 0 20px',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '16px',
};

const section = {
  padding: '24px',
  backgroundColor: '#f6f9fc',
  borderRadius: '6px',
  margin: '24px 0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
