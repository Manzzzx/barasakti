import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/utils';

// Order item validation schema
const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number()
    .int('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1')
    .max(10000, 'Quantity cannot exceed 10,000'),
  unitPrice: z.number()
    .positive('Unit price must be positive')
    .max(1000000, 'Unit price cannot exceed 1,000,000'),
  specifications: z.record(z.string()).optional()
});

// Order validation schema
const orderSchema = z.object({
  customerInfo: z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters'),
    email: z.string()
      .email('Invalid email format')
      .max(255, 'Email must be less than 255 characters'),
    phone: z.string()
      .regex(/^[+]?[0-9\s-()]{10,20}$/, 'Invalid phone number format'),
    company: z.string()
      .max(100, 'Company name must be less than 100 characters')
      .optional(),
    address: z.object({
      street: z.string().min(5, 'Street address must be at least 5 characters'),
      city: z.string().min(2, 'City must be at least 2 characters'),
      state: z.string().min(2, 'State must be at least 2 characters'),
      postalCode: z.string().regex(/^[0-9]{5}$/, 'Invalid postal code format'),
      country: z.string().min(2, 'Country must be at least 2 characters')
    })
  }),
  items: z.array(orderItemSchema)
    .min(1, 'At least one item is required')
    .max(50, 'Maximum 50 items per order'),
  deliveryDate: z.string()
    .datetime('Invalid delivery date format')
    .optional(),
  notes: z.string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional(),
  paymentMethod: z.enum(['bank_transfer', 'cash_on_delivery', 'credit'])
    .optional()
    .default('bank_transfer')
});

// Rate limiting for orders (more restrictive)
const orderLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 100,
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const identifier = request.ip ?? 'anonymous';
    const { success, limit, reset, remaining } = await orderLimiter.check(2, identifier);
    
    if (!success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many order requests. Please try again later.',
          retryAfter: Math.round((reset - Date.now()) / 1000)
        },
        { status: 429 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    // Validate order data
    const validationResult = orderSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Order validation failed',
          details: errors
        },
        { status: 400 }
      );
    }

    const validatedOrder = validationResult.data;

    // Calculate total amount with validation
    let totalAmount = 0;
    const processedItems = validatedOrder.items.map(item => {
      const itemTotal = item.quantity * item.unitPrice;
      totalAmount += itemTotal;
      
      return {
        ...item,
        totalPrice: itemTotal
      };
    });

    // Validate total amount
    if (totalAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid order total amount' },
        { status: 400 }
      );
    }

    if (totalAmount > 10000000) { // 10 million limit
      return NextResponse.json(
        { success: false, error: 'Order amount exceeds maximum limit' },
        { status: 400 }
      );
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order object
    const order = {
      id: orderId,
      ...validatedOrder,
      items: processedItems,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        ipAddress: request.ip,
        userAgent: request.headers.get('user-agent'),
        source: 'website'
      }
    };

    // Here you would typically:
    // 1. Save order to database
    // 2. Send confirmation email
    // 3. Notify sales team
    // 4. Update inventory

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Log order creation
    console.log('Order created:', {
      orderId: order.id,
      customerEmail: order.customerInfo.email,
      totalAmount: order.totalAmount,
      itemCount: order.items.length,
      timestamp: order.createdAt
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Order submitted successfully. You will receive a confirmation email shortly.',
        order: {
          id: order.id,
          totalAmount: order.totalAmount,
          status: order.status,
          createdAt: order.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    // Error logging
    console.error('Order API Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      ip: request.ip
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process order. Please try again later.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Get order status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Validate order ID format
    if (!/^ORD-\d+-[A-Z0-9]{9}$/.test(orderId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid order ID format' },
        { status: 400 }
      );
    }

    // Mock order lookup (replace with database query)
    const mockOrder = {
      id: orderId,
      status: 'processing',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    return NextResponse.json({
      success: true,
      order: mockOrder
    });

  } catch (error) {
    console.error('Order lookup error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve order status' },
      { status: 500 }
    );
  }
}