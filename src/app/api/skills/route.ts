import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.skillCategory.findMany({
      include: {
        skills: {
          orderBy: { displayOrder: 'asc' },
        },
      },
      orderBy: { displayOrder: 'asc' },
    })

    // Transform to grouped format
    const skillsByCategory: { [key: string]: any[] } = {}
    categories.forEach((category) => {
      skillsByCategory[category.name] = category.skills
    })

    return NextResponse.json({ success: true, data: skillsByCategory })
  } catch (error) {
    console.error('Failed to fetch skills:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}
