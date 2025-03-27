import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const profile = await prisma.userProfile.findFirst()
  return NextResponse.json(profile || null)
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const existing = await prisma.userProfile.findFirst()

  const data = {
    name: body.name,
    age: body.age,
    weightKg: body.weightKg,
    heightCm: body.heightCm,
    avatarUrl: body.avatarUrl,
  }

  const profile = existing
    ? await prisma.userProfile.update({ where: { id: existing.id }, data })
    : await prisma.userProfile.create({ data })

  return NextResponse.json(profile)
}
