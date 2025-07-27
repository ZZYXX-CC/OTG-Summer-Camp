import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { NextResponse } from 'next/server';
import { createReadStream } from 'fs';
import { stringify } from 'csv-stringify/sync';
import { supabaseAdmin } from '@/lib/supabase';
import type { Registration } from '@/lib/supabase';

// Initialize Resend with API key validation and domain configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SMTP_FROM = process.env.SMTP_FROM;
const SMTP_TO = process.env.SMTP_TO;
const DOMAIN = 'camp.offthegame.com';

// Email retry configuration
const EMAIL_RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  backoffMultiplier: 2
};

// Move environment checks to runtime
const checkEnvVariables = () => {
  if (!RESEND_API_KEY || !SMTP_FROM || !SMTP_TO) {
    console.error('Missing required environment variables:', {
      hasResendKey: !!RESEND_API_KEY,
      hasSmtpFrom: !!SMTP_FROM,
      hasSmtpTo: !!SMTP_TO
    });
    throw new Error('Missing required environment variables');
  }
  return new Resend(RESEND_API_KEY);
};

// Initialize Resend client at runtime
let resend: Resend;

// Email retry utility function
async function sendEmailWithRetry(
  emailData: any,
  emailType: 'welcome' | 'admin',
  maxRetries = EMAIL_RETRY_CONFIG.maxRetries
): Promise<{ success: boolean; result?: any; error?: any }> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[EMAIL] Attempting to send ${emailType} email (attempt ${attempt}/${maxRetries})`);
      const result = await resend.emails.send(emailData);
      console.log(`[EMAIL] ${emailType} email sent successfully:`, result);
      return { success: true, result };
    } catch (error) {
      lastError = error;
      console.error(`[EMAIL] Attempt ${attempt} failed for ${emailType} email:`, error);
      
      if (attempt < maxRetries) {
        const delay = EMAIL_RETRY_CONFIG.retryDelay * Math.pow(EMAIL_RETRY_CONFIG.backoffMultiplier, attempt - 1);
        console.log(`[EMAIL] Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error(`[EMAIL] All ${maxRetries} attempts failed for ${emailType} email`);
  return { success: false, error: lastError };
}

// Email queue for failed emails (in production, use a proper queue like Redis)
const failedEmailQueue: Array<{
  type: 'welcome' | 'admin';
  data: any;
  timestamp: number;
  registrationId: string;
}> = [];

// Function to add failed emails to queue
function queueFailedEmail(type: 'welcome' | 'admin', data: any, registrationId: string) {
  failedEmailQueue.push({
    type,
    data,
    timestamp: Date.now(),
    registrationId
  });
  console.log(`[EMAIL QUEUE] Added ${type} email to failed queue for registration ${registrationId}`);
}

// Generate unique registration ID
function generateRegistrationId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `OTG-${timestamp}-${randomStr}`.toUpperCase();
}

export async function POST(req: Request) {
  try {
    console.log('[DEBUG] Starting registration process...');
    console.log('[DEBUG] Environment check:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasSmtpFrom: !!process.env.SMTP_FROM,
      hasSmtpTo: !!process.env.SMTP_TO,
      smtpFromDomain: process.env.SMTP_FROM?.split('@')[1],
      nodeEnv: process.env.NODE_ENV
    });
    
    resend = checkEnvVariables();
    console.log('[DEBUG] Resend client initialized');

    // After checkEnvVariables, we know these are defined
    const fromEmail = SMTP_FROM!;
    const toEmail = SMTP_TO!;
    
    console.log('[DEBUG] Email configuration:', { 
      fromEmail: fromEmail.replace(/@.*$/, '@...'), // Log partial email for security
      toEmailCount: toEmail.split(',').length
    });

    const formData = await req.json();
    console.log('[DEBUG] Received form data:', {
      ...formData,
      // Mask sensitive information in logs
      email: formData.email ? '***@***' : undefined,
      phone: formData.phone ? '***' : undefined,
      parentEmail: formData.parentEmail ? '***@***' : undefined,
      parentPhone: formData.parentPhone ? '***' : undefined,
    });

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

    // Generate unique registration ID
    const registrationId = generateRegistrationId();
    console.log('[DEBUG] Generated registration ID:', registrationId);

    // Prepare registration data for Supabase
    const registrationData: Omit<Registration, 'id' | 'created_at'> = {
      registration_id: registrationId,
      participant_first_name: formData.firstName,
      participant_last_name: formData.lastName,
      participant_email: formData.email || null,
      participant_phone: formData.phone || null,
      participant_date_of_birth: formData.dateOfBirth,
      participant_age: formData.age,
      parent_name: formData.parentName,
      parent_email: formData.parentEmail,
      parent_phone: formData.parentPhone,
      emergency_contact_name: formData.emergencyName,
      emergency_contact_phone: formData.emergencyPhone,
      allergies: formData.allergies || null,
      medical_conditions: formData.medicalConditions || null,
      medications: formData.medications || null,
      dietary_restrictions: formData.dietaryRestrictions || null,
      has_football_experience: formData.hasFootballExperience || false,
      football_experience_details: formData.footballExperienceDetails || null,
      preferred_position: formData.preferredPosition || null,
      dominant_foot: formData.dominantFoot || null,
      has_paid: hasPaid,
      payment_method: formData.paymentMethod || null,
      amount_paid: formData.amountPaid || null
    };

    // Save to Supabase database
    try {
      console.log('[DEBUG] Saving registration to Supabase...');
      const { data: supabaseData, error: supabaseError } = await supabaseAdmin
        .from('registrations')
        .insert([registrationData])
        .select()
        .single();

      if (supabaseError) {
        console.error('Supabase insertion error:', supabaseError);
        throw new Error(`Database error: ${supabaseError.message}`);
      }

      console.log('[DEBUG] Registration saved successfully to Supabase:', supabaseData.id);
    } catch (dbError) {
      console.error('Failed to save registration to database:', dbError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save registration. Please try again.'
        },
        { status: 500 }
      );
    }

    // Send welcome email to registrant (only if they provided an email)
    let welcomeEmailSuccess = false;
    if (formData.email) {
      console.log('[EMAIL] Preparing welcome email for:', formData.email);
      
      const welcomeEmailData = {
        from: fromEmail,
        to: formData.email,
        subject: 'Welcome to OTG Football Academy Camp!',
        react: WelcomeEmail({
          playerName: `${formData.firstName} ${formData.lastName}`,
          campDates: formData.campDates || 'upcoming session',
          paymentStatus,
          registrationId
        }),
        text: `Welcome to OTG Football Academy Camp, ${formData.firstName}! Your registration ID is: ${registrationId}. Payment status: ${paymentStatus}`
      };

      const welcomeResult = await sendEmailWithRetry(welcomeEmailData, 'welcome');
      welcomeEmailSuccess = welcomeResult.success;
      
      if (!welcomeEmailSuccess) {
        console.error('[EMAIL] Welcome email failed after all retries, adding to queue');
        queueFailedEmail('welcome', welcomeEmailData, registrationId);
      }
    } else {
      console.log('[EMAIL] Skipping welcome email - no email provided');
    }

    // Send CSV data to admin email
    const csvData = `Registration ID,Participant Name,Email,Phone,Date of Birth,Age,Parent Name,Parent Email,Parent Phone,Emergency Contact,Emergency Phone,Allergies,Medical Conditions,Medications,Dietary Restrictions,Football Experience,Experience Details,Preferred Position,Dominant Foot,Has Paid,Payment Method,Amount Paid,Registration Date
${registrationId},"${formData.firstName} ${formData.lastName}",${formData.email || 'N/A'},${formData.phone || 'N/A'},${formData.dateOfBirth},${formData.age},"${formData.parentName}",${formData.parentEmail},${formData.parentPhone},"${formData.emergencyName}",${formData.emergencyPhone},"${formData.allergies || 'None'}","${formData.medicalConditions || 'None'}","${formData.medications || 'None'}","${formData.dietaryRestrictions || 'None'}",${formData.hasFootballExperience ? 'Yes' : 'No'},"${formData.footballExperienceDetails || 'N/A'}",${formData.preferredPosition || 'N/A'},${formData.dominantFoot || 'N/A'},${hasPaid ? 'Yes' : 'No'},${formData.paymentMethod || 'N/A'},${formData.amountPaid || '0'},${new Date().toISOString()}
`;

    // Send admin notification email
    console.log('[EMAIL] Preparing admin notification email');
    
    // Split SMTP_TO into an array if it contains multiple emails
    const toEmails = toEmail.split(',').map(email => email.trim());
    
    const adminEmailData = {
      from: fromEmail,
      to: toEmails,
      subject: `New Registration - ${registrationId} - OTG Football Academy`,
      text: `New registration received for ${formData.firstName} ${formData.lastName}.

Registration Details:
- Registration ID: ${registrationId}
- Participant: ${formData.firstName} ${formData.lastName}
- Age: ${formData.age}
- Parent: ${formData.parentName} (${formData.parentEmail})
- Emergency Contact: ${formData.emergencyName} (${formData.emergencyPhone})
- Football Experience: ${formData.hasFootballExperience ? 'Yes' : 'No'}
- Payment Status: ${paymentStatus}
- Payment Method: ${formData.paymentMethod || 'N/A'}
- Amount Paid: ${formData.amountPaid || '0'}
- Registration Date: ${new Date().toLocaleString()}

Please find the complete details in the attached CSV file.`,
      attachments: [
        {
          filename: 'registration.csv',
          content: Buffer.from(csvData).toString('base64'),
          type: 'text/csv'
        }
      ]
    };

    const adminResult = await sendEmailWithRetry(adminEmailData, 'admin');
    let adminEmailSuccess = adminResult.success;
    
    if (!adminEmailSuccess) {
      console.error('[EMAIL] Admin email failed after all retries, adding to queue');
      queueFailedEmail('admin', adminEmailData, registrationId);
      // Don't fail the entire registration for admin email issues
      console.log('[EMAIL] Continuing with registration despite admin email failure');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        registrationId: registrationId,
        emailStatus: {
          welcomeEmail: welcomeEmailSuccess ? 'sent' : 'queued_for_retry',
          adminEmail: adminEmailSuccess ? 'sent' : 'queued_for_retry'
        }
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

// Endpoint to retry failed emails
export async function PUT(request: Request) {
  try {
    const { registrationId } = await request.json();
    
    if (!registrationId) {
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    // Initialize Resend client
    resend = checkEnvVariables();
    
    // Find failed emails for this registration
    const failedEmails = failedEmailQueue.filter(email => email.registrationId === registrationId);
    
    if (failedEmails.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No failed emails found for this registration'
      });
    }

    const retryResults = [];
    
    for (const failedEmail of failedEmails) {
      console.log(`[EMAIL RETRY] Retrying ${failedEmail.type} email for registration ${registrationId}`);
      
      const result = await sendEmailWithRetry(failedEmail.data, failedEmail.type);
      retryResults.push({
        type: failedEmail.type,
        success: result.success,
        error: result.error
      });
      
      // Remove from queue if successful
      if (result.success) {
        const index = failedEmailQueue.indexOf(failedEmail);
        if (index > -1) {
          failedEmailQueue.splice(index, 1);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Email retry completed',
      results: retryResults
    });
    
  } catch (error) {
    console.error('Email retry error:', error);
    return NextResponse.json(
      { error: 'Failed to retry emails' },
      { status: 500 }
    );
  }
}
