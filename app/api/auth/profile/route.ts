import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const profile = await prisma.userProfile.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        username: true,
        name: true,
        age: true,
        weightKg: true,
        heightCm: true,
        avatarUrl: true,
        // Explicitly exclude password
      }
    })

    if (!profile) {
      return NextResponse.json({ message: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { userId, name, age, weightKg, heightCm, avatarUrl } = body

  if (!userId) {
    return NextResponse.json({ message: 'Missing userId' }, { status: 400 })
  }

  const updated = await prisma.userProfile.update({
    where: { id: userId },
    data: {
      name,
      age,
      weightKg,
      heightCm,
      avatarUrl,
    },
  })

  return NextResponse.json(updated)
}
