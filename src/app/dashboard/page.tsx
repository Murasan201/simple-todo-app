"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

interface Task {
  id: number
  title: string
  done: boolean
  createdAt: string
}

interface User {
  id: number
  email: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const checkAuth = useCallback(async () => {
    try {
      // ユーザー情報を取得
      const userResponse = await fetch("/api/auth/me")
      if (userResponse.status === 401) {
        router.push("/auth/signin")
        return
      }
      
      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUser(userData.user)
        
        // タスクを取得
        const tasksResponse = await fetch("/api/tasks")
        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json()
          setTasks(tasksData)
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      router.push("/auth/signin")
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/auth/signin")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    setSubmitting(true)
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: newTask.trim() })
      })

      if (response.ok) {
        const task = await response.json()
        setTasks([task, ...tasks])
        setNewTask("")
      }
    } catch (error) {
      console.error("Failed to add task:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const toggleTask = async (id: number, done: boolean) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ done: !done })
      })

      if (response.ok) {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, done: !done } : task
        ))
      }
    } catch (error) {
      console.error("Failed to toggle task:", error)
    }
  }

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">読み込み中...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">ToDoリスト</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={addTask} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="新しいタスクを入力..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={submitting || !newTask.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-6 py-2 rounded-md text-white font-medium"
                >
                  {submitting ? "追加中..." : "追加"}
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  タスクがありません。上のフォームから新しいタスクを追加してください。
                </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      task.done ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id, task.done)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span
                        className={`${
                          task.done
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-800 px-2 py-1 rounded"
                    >
                      削除
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}