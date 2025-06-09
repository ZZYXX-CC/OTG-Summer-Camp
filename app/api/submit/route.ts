import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import WelcomeEmail from '@/emails/welcome-email';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@offthegame.com';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'dummy-key-for-build') {
      console.log('Resend API key not configured, skipping email sending');
      return NextResponse.json({
        success: true,
        message: 'Registration received (email service not configured)',
      });
    }
    
    // Convert form data to CSV
    const csvData = [
      ['Field', 'Value'],
      ['First Name', data.firstName],
      ['Last Name', data.lastName],
      ['Email', data.email || 'Not provided'],
      ['Phone', data.phone],
      ['Date of Birth', data.dateOfBirth],
      ['Parent/Guardian Name', data.parentName],
      ['Emergency Contact', data.emergencyContact],
      ['Medical Information', data.medicalInfo],
      ['Football Experience', data.footballExperience],
      ['Submission Date', new Date().toISOString()]
    ].map(row => row.join(',')).join('\n');

    // Send admin email with CSV
    await resend.emails.send({
      from: 'OTG Football Academy <noreply@offthegame.com>',
      to: ADMIN_EMAIL,
      subject: `New Registration: ${data.firstName} ${data.lastName}`,
      text: `New registration received for the Summer Football Camp.\n\n${csvData}`,
      attachments: [{
        filename: 'registration.csv',
        content: Buffer.from(csvData).toString('base64')
      }],
    });

    // Send welcome email if parent email is provided
    if (data.email) {
      await resend.emails.send({
        from: 'OTG Football Academy <noreply@offthegame.com>',
        to: data.email,
        subject: 'Welcome to OTG Football Academy Summer Camp!',
        react: WelcomeEmail({
          firstName: data.firstName,
          parentName: data.parentName,
        }) as React.ReactElement,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Error processing registration:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process registration',
      },
      { status: 500 }
    );
  }
}
