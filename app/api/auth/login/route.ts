import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const user = await prisma.userProfile.findUnique({ where: { username } })
  if (!user || !user.password) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  return NextResponse.json({ userId: user.id }, { status: 200 })
}
