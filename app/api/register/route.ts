import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { NextResponse } from 'next/server';
import { createReadStream } from 'fs';
import { stringify } from 'csv-stringify/sync';

// Initialize Resend with API key validation and domain configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SMTP_FROM = process.env.SMTP_FROM;
const SMTP_TO = process.env.SMTP_TO;
const DOMAIN = 'camp.offthegame.com';

if (!RESEND_API_KEY || !SMTP_FROM || !SMTP_TO) {
  console.error('Missing required environment variables:', {
    hasResendKey: !!RESEND_API_KEY,
    hasSmtpFrom: !!SMTP_FROM,
    hasSmtpTo: !!SMTP_TO
  });
  throw new Error('Missing required environment variables');
}

// Initialize Resend client
const resend = new Resend(RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log('Received form data:', formData);

    // Validate required fields
    let requiredFields = [
      'firstName', 'lastName', 'phone', 'dateOfBirth', 'age',
      'emergencyName', 'emergencyPhone', 'parentName', 'parentEmail',
      'parentPhone'
    ];

    // Add payment fields to required fields only if payment has been made
    if (formData.hasPaid) {
      requiredFields = [...requiredFields, 'paymentMethod', 'amountPaid'];
    }

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return NextResponse.json(
        { 
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Additional validation
    if (typeof formData.age !== 'number' || formData.age < 5 || formData.age > 18) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Age must be between 5 and 18 years old'
        },
        { status: 400 }
      );
    }

    // Process payment
    const hasPaid = formData.hasPaid;
    const paymentStatus = hasPaid ? 'Completed' : 'Pending';

    // Send welcome email to registrant (only if they provided an email)
    if (formData.email && SMTP_FROM) {
      try {
        console.log('Attempting to send welcome email to:', formData.email);
        
        const emailData = {
          from: `OTG Football Academy <noreply@camp.offthegame.com>`,
          to: formData.email,
          subject: 'Welcome to OTG Football Academy Camp!',
          react: WelcomeEmail({
            playerName: `${formData.firstName} ${formData.lastName}`,
            campDates: formData.campDates || 'upcoming session',
            paymentStatus
          }),
          text: `Welcome to OTG Football Academy Camp, ${formData.firstName}! Your registration status is: ${paymentStatus}`
        };

        const welcomeEmailResult = await resend.emails.send(emailData);
        console.log('Welcome email sent successfully:', welcomeEmailResult.id);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Continue with registration even if email fails
        console.log('Continuing with registration despite email failure');
      }
    } else {
      console.log('Skipping welcome email - no email provided or SMTP_FROM not configured');
    }

    // Send CSV data to admin email
    const csvData = `
Participant Name,Email,Phone,Date of Birth,Age,Has Paid,Payment Status,Payment Method,Amount Paid
${formData.firstName} ${formData.lastName},${formData.email || 'N/A'},${formData.phone || 'N/A'},${formData.dateOfBirth},${formData.age},${hasPaid},${paymentStatus},${formData.paymentMethod},${formData.amountPaid}
`;

    try {
      const adminEmailData = {
        from: `OTG Football Academy <noreply@camp.offthegame.com>`,
        to: SMTP_TO,
        subject: 'New Registration - OTG Football Academy',
        text: `New registration received for ${formData.firstName} ${formData.lastName}.

Registration Details:
- Name: ${formData.firstName} ${formData.lastName}
- Age: ${formData.age}
- Payment Status: ${paymentStatus}
- Payment Method: ${formData.paymentMethod}
- Amount Paid: ${formData.amountPaid}

Please find the complete details in the attached CSV file.`,
        attachments: [
          {
            filename: 'registration.csv',
            content: Buffer.from(csvData).toString('base64'),
            type: 'text/csv'
          }
        ]
      };

      const adminEmailResult = await resend.emails.send(adminEmailData);
      console.log('Admin notification sent successfully:', adminEmailResult.id);
    } catch (adminEmailError) {
      console.error('Failed to send admin notification:', adminEmailError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to process registration. Please contact support.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process registration'
      },
      { status: 500 }
    );
  }
}
