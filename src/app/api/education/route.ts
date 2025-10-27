import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: [{ displayOrder: 'asc' }, { endDate: 'desc' }],
    })

    return NextResponse.json({ success: true, data: education })
  } catch (error) {
    console.error('Failed to fetch education:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch education' },
      { status: 500 }
    )
  }
}
