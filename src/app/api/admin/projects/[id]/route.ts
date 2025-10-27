import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { projectSchema } from '@/lib/validation'
import { generateSlug, generateUniqueId } from '@/lib/utils'
import * as bcrypt from 'bcryptjs'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = projectSchema.parse(body)

    const existing = await prisma.project.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    const updateData: any = {
      title: validatedData.title,
      description: validatedData.description,
      technologies: validatedData.technologies || [],
      projectDate: validatedData.projectDate ? new Date(validatedData.projectDate) : null,
      visibility: validatedData.visibility,
      isFeatured: validatedData.isFeatured || false,
      demoUrl: validatedData.demoUrl || null,
      githubUrl: validatedData.githubUrl || null,
    }

    // Update slug if title changed
    if (validatedData.title !== existing.title) {
      let slug = generateSlug(validatedData.title)
      let existingProject = await prisma.project.findFirst({
        where: { slug, NOT: { id: params.id } },
      })
      let counter = 1
      while (existingProject) {
        slug = `${generateSlug(validatedData.title)}-${counter}`
        existingProject = await prisma.project.findFirst({
          where: { slug, NOT: { id: params.id } },
        })
        counter++
      }
      updateData.slug = slug
    }

    // Generate unique link ID if changed to unlisted/password
    if (
      (validatedData.visibility === 'unlisted' || validatedData.visibility === 'password') &&
      !existing.uniqueLinkId
    ) {
      updateData.uniqueLinkId = generateUniqueId()
    }

    // Update password if changed
    if (validatedData.visibility === 'password' && validatedData.password) {
      updateData.passwordHash = await bcrypt.hash(validatedData.password, 10)
    } else if (validatedData.visibility !== 'password') {
      updateData.passwordHash = null
    }

    const updated = await prisma.project.update({
      where: { id: params.id },
      data: updateData,
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('Failed to update project:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.project.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
