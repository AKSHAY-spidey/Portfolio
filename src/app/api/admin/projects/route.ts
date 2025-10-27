import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { projectSchema } from '@/lib/validation'
import { generateSlug, generateUniqueId } from '@/lib/utils'
import * as bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const projects = await prisma.project.findMany({
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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = projectSchema.parse(body)

    // Generate slug from title
    let slug = generateSlug(validatedData.title)

    // Ensure slug is unique
    let existingProject = await prisma.project.findUnique({ where: { slug } })
    let counter = 1
    while (existingProject) {
      slug = `${generateSlug(validatedData.title)}-${counter}`
      existingProject = await prisma.project.findUnique({ where: { slug } })
      counter++
    }

    // Generate unique link ID for unlisted/password projects
    let uniqueLinkId = null
    if (validatedData.visibility === 'unlisted' || validatedData.visibility === 'password') {
      uniqueLinkId = generateUniqueId()
    }

    // Hash password if password-protected
    let passwordHash = null
    if (validatedData.visibility === 'password' && validatedData.password) {
      passwordHash = await bcrypt.hash(validatedData.password, 10)
    }

    const project = await prisma.project.create({
      data: {
        title: validatedData.title,
        slug,
        description: validatedData.description,
        technologies: validatedData.technologies || [],
        projectDate: validatedData.projectDate ? new Date(validatedData.projectDate) : null,
        visibility: validatedData.visibility,
        uniqueLinkId,
        passwordHash,
        isFeatured: validatedData.isFeatured || false,
        demoUrl: validatedData.demoUrl || null,
        githubUrl: validatedData.githubUrl || null,
      },
      include: {
        images: true,
      },
    })

    return NextResponse.json({ success: true, data: project })
  } catch (error: any) {
    console.error('Failed to create project:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
