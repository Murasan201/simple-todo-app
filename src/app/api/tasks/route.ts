import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getSession } from "@/lib/session"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Get tasks error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { title } = await request.json()

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        userId: user.id
      }
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error("Create task error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}