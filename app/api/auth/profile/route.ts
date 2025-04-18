import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ message: 'Missing userId' }, { status: 400 })
  }

  const profile = await prisma.userProfile.findUnique({
    where: { id: userId },
  })

  return NextResponse.json(profile || null)
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
