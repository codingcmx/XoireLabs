
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10).max(500),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = contactFormSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ message: 'Invalid form data', errors: parsedData.error.format() }, { status: 400 });
    }

    const { name, email, company, message } = parsedData.data;

    // In a real application, you would send an email here using a service
    // like SendGrid, Resend, Nodemailer, etc.
    // For this example, we'll just log it to the console.
    console.log('New contact form submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    if (company) console.log('Company:', company);
    console.log('Message:', message);
    
    // Simulate email sending delay
    // await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ message: 'Message received successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
