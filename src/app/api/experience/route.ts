import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: [{ displayOrder: 'asc' }, { startDate: 'desc' }],
    })

    return NextResponse.json({ success: true, data: experience })
  } catch (error) {
    console.error('Failed to fetch experience:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experience' },
      { status: 500 }
    )
  }
}
