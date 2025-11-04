import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!resend) {
      console.error('Resend API key not configured');
      return NextResponse.json(
        { 
          error: 'Email service not configured. Please contact us directly at info@pulsenexis.com.',
        },
        { status: 503 }
      );
    }

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: 'PulseNexis Contact <noreply@pulsenexis.com>',
      to: ['info@pulsenexis.com'],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7b6cd9; border-bottom: 2px solid #7b6cd9; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #555;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e7f3ff; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Note:</strong> This email was sent from the PulseNexis contact form. 
              You can reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
    });

    console.log('Email sent successfully:', emailData.data?.id || 'Email sent');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24-48 hours.',
        emailId: emailData.data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Return user-friendly error message
    return NextResponse.json(
      { 
        error: 'Sorry, there was an issue sending your message. Please try again or email us directly at info@pulsenexis.com.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}