import { cookies } from "next/headers"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export interface User {
  id: number
  email: string
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_id")?.value

  if (!userId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    select: { id: true, email: true }
  })

  return user
}

export async function createSession(userId: number) {
  const cookieStore = await cookies()
  cookieStore.set("user_id", userId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete("user_id")
}

export async function authenticate(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

  if (!isPasswordValid) {
    return null
  }

  return {
    id: user.id,
    email: user.email
  }
}