import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendContactNotification } from '@/lib/email'
import { contactFormSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactFormSchema.parse(body)

    // Check if contact form is enabled
    const settings = await prisma.siteSettings.findFirst()
    if (!settings?.contactFormEnabled) {
      return NextResponse.json(
        { success: false, error: 'Contact form is currently disabled' },
        { status: 403 }
      )
    }

    // Save message to database
    const message = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || null,
        message: validatedData.message,
      },
    })

    // Send email notification if configured
    if (settings.notificationEmail) {
      await sendContactNotification({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        notificationEmail: settings.notificationEmail,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
    })
  } catch (error: any) {
    console.error('Failed to process contact form:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
