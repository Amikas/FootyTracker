import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const body = await req.json()
  const {
    username,
    password,
    name,
    age,
    weightKg,
    heightCm,
    avatarUrl,
  } = body

  if (!username || !password || !name) {
    return NextResponse.json(
      { message: 'Username, password, and name are required' },
      { status: 400 }
    )
  }

  const existing = await prisma.userProfile.findUnique({ where: { username } })
  if (existing) {
    return NextResponse.json({ message: 'Username already exists' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)

  const newUser = await prisma.userProfile.create({
    data: {
      username,
      password: hashed,
      name,
      age: age ?? null,
      weightKg: weightKg ?? null,
      heightCm: heightCm ?? null,
      avatarUrl: avatarUrl || null,
    },
  })

  return NextResponse.json({ userId: newUser.id }, { status: 201 })
}
