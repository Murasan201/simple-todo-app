import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getSession } from "@/lib/session"

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const resolvedParams = await params
    const taskId = parseInt(resolvedParams.id)
    const { done } = await request.json()

    if (typeof done !== "boolean") {
      return NextResponse.json(
        { error: "Done must be a boolean" },
        { status: 400 }
      )
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: user.id
      }
    })

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      )
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        done
      }
    })

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("Update task error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const resolvedParams = await params
    const taskId = parseInt(resolvedParams.id)

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: user.id
      }
    })

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      )
    }

    await prisma.task.delete({
      where: {
        id: taskId
      }
    })

    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("Delete task error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}