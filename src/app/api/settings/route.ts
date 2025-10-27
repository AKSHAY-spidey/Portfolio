import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst()

    if (!settings) {
      return NextResponse.json(
        { success: false, error: 'Settings not found' },
        { status: 404 }
      )
    }

    // Return only public settings
    const publicSettings = {
      siteTitle: settings.siteTitle,
      metaDescription: settings.metaDescription,
      faviconUrl: settings.faviconUrl,
      themeColor: settings.themeColor,
      contactFormEnabled: settings.contactFormEnabled,
    }

    return NextResponse.json({ success: true, data: publicSettings })
  } catch (error) {
    console.error('Failed to fetch settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}
