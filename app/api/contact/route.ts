import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/utils';

// Validation schema with comprehensive rules
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[+]?[0-9\s-()]{10,20}$/.test(val), {
      message: 'Invalid phone number format'
    }),
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  inquiryType: z.enum(['general', 'product', 'partnership', 'support'])
    .optional()
    .default('general'),
  preferredContact: z.enum(['email', 'phone', 'whatsapp'])
    .optional()
    .default('email')
});

// Rate limiting configuration
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per minute
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const identifier = request.ip ?? 'anonymous';
    const { success, limit, reset, remaining } = await limiter.check(5, identifier);
    
    if (!success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.round((reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
          }
        }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    // Validate data against schema
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: errors
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Sanitize input data
    const sanitizedData = {
      ...validatedData,
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      phone: validatedData.phone?.trim(),
      company: validatedData.company?.trim(),
      subject: validatedData.subject.trim(),
      message: validatedData.message.trim(),
    };

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Log the inquiry
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock database save (replace with actual implementation)
    const inquiry = {
      id: `INQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...sanitizedData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ipAddress: request.ip,
      userAgent: request.headers.get('user-agent')
    };

    // Log successful submission (replace with proper logging)
    console.log('Contact inquiry received:', {
      id: inquiry.id,
      email: inquiry.email,
      subject: inquiry.subject,
      timestamp: inquiry.createdAt
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been submitted successfully. We will get back to you soon.',
        inquiryId: inquiry.id
      },
      { 
        status: 201,
        headers: {
          'X-RateLimit-Remaining': remaining.toString(),
        }
      }
    );

  } catch (error) {
    // Log error for debugging (replace with proper error logging)
    console.error('Contact API Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      ip: request.ip
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again later.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}