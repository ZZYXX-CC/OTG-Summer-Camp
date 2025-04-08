import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  playerName: string;
  campDates: string;
  paymentStatus: string;
}

export const WelcomeEmail = ({
  playerName = "there",
  campDates = "upcoming session",
  paymentStatus = "pending"
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to OTG Football Academy Camp!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://otgfootballacademy.com/logo.png"
            width="170"
            height="50"
            alt="OTG Football Academy"
            style={logo}
          />
          <Heading style={heading}>Welcome to OTG Football Academy!</Heading>
          <Section style={section}>
            <Text style={text}>Hi {playerName},</Text>
            <Text style={text}>
              Thank you for registering for our {campDates} football camp! We're excited to have you join us.
            </Text>
            <Text style={text}>
              Your registration status is: <strong>{paymentStatus}</strong>
            </Text>
            <Text style={text}>
              What's next?
              <ul style={list}>
                <li>Save the camp dates in your calendar</li>
                <li>Complete your payment if pending</li>
                <li>Pack your football gear and water bottle</li>
                <li>Get ready for an amazing football experience!</li>
              </ul>
            </Text>
            <Text style={text}>
              If you have any questions, feel free to reply to this email or contact our support team.
            </Text>
            <Text style={text}>
              Best regards,<br />
              The OTG Football Academy Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

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

const logo = {
  margin: '0 auto',
  marginBottom: '32px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
  textAlign: 'center' as const,
};

const section = {
  padding: '0 48px',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
};

const list = {
  marginLeft: '26px',
  marginBottom: '32px',
};
