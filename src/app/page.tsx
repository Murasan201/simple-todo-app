import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple Todo App
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              シンプルで使いやすいタスク管理アプリケーション
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href="/auth/signin"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors block text-center"
              >
                ログイン
              </Link>
              <Link
                href="/auth/signup"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-indigo-600 font-medium py-3 px-6 rounded-lg border border-indigo-600 transition-colors block text-center"
              >
                新規登録
              </Link>
            </div>
          </div>
          
          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              主な機能
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">タスク管理</h3>
                <p className="text-gray-600 text-sm">
                  タスクの追加、削除、完了状態の切り替えが簡単にできます
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">ユーザー認証</h3>
                <p className="text-gray-600 text-sm">
                  安全なログイン機能でデータを保護します
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">レスポンシブ対応</h3>
                <p className="text-gray-600 text-sm">
                  PC、タブレット、スマートフォンで快適に利用できます
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">データ永続化</h3>
                <p className="text-gray-600 text-sm">
                  タスクはデータベースに保存され、いつでもアクセスできます
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
