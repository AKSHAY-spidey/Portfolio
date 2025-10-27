import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const socialLinks = await prisma.socialLink.findMany({
      orderBy: { displayOrder: 'asc' },
    })

    return NextResponse.json({ success: true, data: socialLinks })
  } catch (error) {
    console.error('Failed to fetch social links:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch social links' },
      { status: 500 }
    )
  }
}
