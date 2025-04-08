import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { NextResponse } from 'next/server';
import { createReadStream } from 'fs';
import { stringify } from 'csv-stringify/sync';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log('Received form data:', JSON.stringify(formData, null, 2));
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'age'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return NextResponse.json(
        { 
          error: `Missing required fields: ${missingFields.join(', ')}`,
          status: 'validation_error',
          missingFields
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      console.log('Invalid email format:', formData.email);
      return NextResponse.json(
        { 
          error: 'Invalid email address format',
          status: 'validation_error',
          field: 'email'
        },
        { status: 400 }
      );
    }

    // Validate phone number
    if (!/^\+234[0-9]{10}$/.test(formData.phone)) {
      console.log('Invalid phone format:', formData.phone);
      return NextResponse.json(
        { 
          error: 'Phone number must be in format +234XXXXXXXXXX',
          status: 'validation_error',
          field: 'phone'
        },
        { status: 400 }
      );
    }

    // Validate age
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 6 || age > 18) {
      console.log('Invalid age:', formData.age);
      return NextResponse.json(
        { 
          error: 'Age must be between 6 and 18',
          status: 'validation_error',
          field: 'age'
        },
        { status: 400 }
      );
    }

    try {
      // Send welcome email to registrant
      await resend.emails.send({
        from: process.env.SMTP_FROM!,
        to: formData.email,
        subject: 'Welcome to OTG Football Academy Camp!',
        react: WelcomeEmail({
          playerName: `${formData.firstName} ${formData.lastName}`,
          campDates: formData.campDates || 'upcoming session',
          paymentStatus: formData.hasPaid ? 'Completed' : 'Pending'
        })
      });

      // Prepare data for CSV
      const csvData = [
        {
          'First Name': formData.firstName,
          'Last Name': formData.lastName,
          Email: formData.email,
          Phone: formData.phone,
          Age: formData.age,
          'Payment Status': formData.hasPaid ? 'Completed' : 'Pending',
          'Prior Experience': formData.priorExperience ? 'Yes' : 'No',
          'Experience Details': formData.experienceDetails || '',
          'Emergency Contact Name': formData.emergencyName,
          'Emergency Contact Phone': formData.emergencyPhone,
          'Medical Conditions': formData.medicalConditions || '',
          'Dietary Restrictions': formData.dietaryRestrictions || '',
          'Parent/Guardian Name': formData.parentName,
          'Parent/Guardian Email': formData.parentEmail,
          'Parent/Guardian Phone': formData.parentPhone
        }
      ];

      // Convert to CSV
      const csvString = stringify(csvData, {
        header: true
      });

      // Send CSV to admin
      await resend.emails.send({
        from: process.env.SMTP_FROM!,
        to: process.env.SMTP_TO_CSV!,
        subject: `New Registration: ${formData.firstName} ${formData.lastName}`,
        text: 'Please find the registration details in the attached CSV file.',
        attachments: [{
          filename: `registration_${formData.firstName}_${formData.lastName}.csv`,
          content: Buffer.from(csvString)
        }]
      });

      // Send notification to admin
      await resend.emails.send({
        from: process.env.SMTP_FROM!,
        to: process.env.SMTP_TO!,
        subject: `New Camp Registration: ${formData.firstName} ${formData.lastName}`,
        text: `
New registration details:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Age: ${formData.age}
Payment Status: ${formData.hasPaid ? 'Completed' : 'Pending'}
Prior Experience: ${formData.priorExperience ? 'Yes' : 'No'}
${formData.experienceDetails ? `Experience Details: ${formData.experienceDetails}\n` : ''}
Emergency Contact: ${formData.emergencyName} (${formData.emergencyPhone})
Parent/Guardian: ${formData.parentName} (${formData.parentEmail}, ${formData.parentPhone})
${formData.medicalConditions ? `Medical Conditions: ${formData.medicalConditions}\n` : ''}
${formData.dietaryRestrictions ? `Dietary Restrictions: ${formData.dietaryRestrictions}` : ''}
        `
      });

      console.log('Registration successful for:', formData.firstName, formData.lastName);
      return NextResponse.json(
        { 
          message: 'Registration successful!',
          status: 'success'
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Registration error:', {
        error,
        errorStack: error instanceof Error ? error.stack : undefined,
        errorName: error instanceof Error ? error.name : undefined,
        errorMessage: error instanceof Error ? error.message : undefined
      });
      
      return NextResponse.json(
        { 
          error: error instanceof Error ? error.message : 'Failed to process registration',
          status: 'server_error',
          details: error instanceof Error ? error.stack : undefined
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Form validation error:', {
      error,
      errorStack: error instanceof Error ? error.stack : undefined,
      errorName: error instanceof Error ? error.name : undefined,
      errorMessage: error instanceof Error ? error.message : undefined
    });
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Invalid form data',
        status: 'validation_error',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 400 }
    );
  }
}
