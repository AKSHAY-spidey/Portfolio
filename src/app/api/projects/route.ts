import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const visibility = searchParams.get('visibility')
    const featured = searchParams.get('featured')

    const where: any = {}

    // Public site only shows public projects
    if (visibility === 'public' || !visibility) {
      where.visibility = 'public'
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
        },
      },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
