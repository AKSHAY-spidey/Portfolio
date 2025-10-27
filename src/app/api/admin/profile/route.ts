import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { profileSchema } from '@/lib/validation'

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = profileSchema.parse(body)

    const profile = await prisma.profile.findFirst()

    if (profile) {
      const updated = await prisma.profile.update({
        where: { id: profile.id },
        data: validatedData,
      })
      return NextResponse.json({ success: true, data: updated })
    } else {
      const created = await prisma.profile.create({
        data: validatedData,
      })
      return NextResponse.json({ success: true, data: created })
    }
  } catch (error: any) {
    console.error('Failed to update profile:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
