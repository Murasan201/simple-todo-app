# 📚 Simple Todo App - 学習ガイド

## 概要

このドキュメントは、Simple Todo Appの技術構成と実装方法を学習目的で詳しく解説したガイドです。フルスタックWebアプリケーションを自分で実装する際の参考資料として活用してください。

## 🏗️ システム全体構成

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Next.js 15.3.3 (App Router) + React 19.0.0       │   │
│  │  TypeScript 5.x + Tailwind CSS 4.x                 │   │
│  │  - ページルーティング                                   │   │
│  │  - コンポーネント管理                                   │   │
│  │  - レスポンシブUI                                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                               ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Next.js API Routes                       │   │
│  │  - /api/auth/* (認証エンドポイント)                     │   │
│  │  - /api/tasks/* (タスク管理エンドポイント)                │   │
│  │  - セッション管理                                      │   │
│  │  - リクエスト検証                                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                               ↕ Database Connection
┌─────────────────────────────────────────────────────────────┐
│                     Database Layer                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Prisma ORM 6.9.0 + Neon PostgreSQL               │   │
│  │  - スキーマ定義                                        │   │
│  │  - クエリビルダー                                      │   │
│  │  - マイグレーション                                     │   │
│  │  - 型安全なデータアクセス                                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                               ↕ CI/CD Pipeline
┌─────────────────────────────────────────────────────────────┐
│                    Deployment Layer                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  GitHub → Vercel 自動デプロイ                          │   │
│  │  - ソースコード管理                                     │   │
│  │  - 自動ビルド・テスト                                   │   │
│  │  - 本番環境デプロイ                                     │   │
│  │  - 環境変数管理                                        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ 技術スタック詳細

### Frontend技術

#### 1. Next.js 15.3.3 (App Router)
**役割**: React ベースのフルスタックフレームワーク
**選択理由**: 
- サーバーサイドレンダリング (SSR)
- 静的サイト生成 (SSG)
- API Routes による バックエンド機能
- 自動コード分割とパフォーマンス最適化

**学習時のポイント**:
```javascript
// App Router の基本構造
src/app/
├── layout.tsx          // 全ページ共通レイアウト
├── page.tsx           // ホームページ
├── auth/
│   ├── signin/page.tsx // ログインページ
│   └── signup/page.tsx // 登録ページ
├── dashboard/page.tsx  // ダッシュボード
└── api/               // API エンドポイント
    ├── auth/
    └── tasks/
```

#### 2. React 19.0.0
**役割**: ユーザーインターフェース構築
**学習ポイント**:
- 関数コンポーネントとHooks
- useState, useEffect の活用
- コンポーネント設計パターン

**実装例**:
```tsx
// 基本的なコンポーネント構造
'use client';
import { useState, useEffect } from 'react';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API からタスクを取得
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

#### 3. TypeScript 5.x
**役割**: 型安全性の提供
**学習ポイント**:
- インターフェースの定義
- 型注釈の使用
- 型推論の活用

**実装例**:
```typescript
// 型定義
interface User {
  id: number;
  email: string;
  createdAt: Date;
}

interface Task {
  id: number;
  userId: number;
  title: string;
  done: boolean;
  createdAt: Date;
  user: User;
}

// API レスポンスの型
interface TasksResponse {
  tasks: Task[];
  total: number;
}

// 関数の型定義
const createTask = async (title: string): Promise<Task> => {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  return response.json();
};
```

#### 4. Tailwind CSS 4.x
**役割**: ユーティリティファーストCSSフレームワーク
**学習ポイント**:
- レスポンシブデザイン
- コンポーネントベーススタイリング
- カスタムテーマ設定

**実装例**:
```tsx
// Tailwind を使用したコンポーネント
export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${
          task.done ? 'line-through text-gray-500' : 'text-gray-900'
        }`}>
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Toggle
          </button>
          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Backend技術

#### 1. Next.js API Routes
**役割**: RESTful API の実装
**学習ポイント**:
- HTTP メソッドの処理
- リクエスト・レスポンスの管理
- エラーハンドリング

**実装例**:
```typescript
// src/app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

// GET /api/tasks - タスク一覧取得
export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - タスク作成
export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title } = await request.json();
    
    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        userId: session.userId
      }
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### 2. カスタム認証システム
**役割**: ユーザー認証とセッション管理
**学習ポイント**:
- パスワードハッシュ化
- セッション管理
- セキュリティベストプラクティス

**実装例**:
```typescript
// src/lib/session.ts
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface SessionData {
  userId: number;
  email: string;
}

export async function createSession(userId: number, email: string) {
  const token = jwt.sign(
    { userId, email },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: '7d' }
  );

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 // 7日間
  });
}

export async function getSession(request: NextRequest): Promise<SessionData | null> {
  try {
    const token = request.cookies.get('session')?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as SessionData;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
```

**パスワードハッシュ化の実装**:
```typescript
// src/lib/auth.ts
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
```

### Database技術

#### 1. Prisma ORM 6.9.0
**役割**: データベースアクセス層
**学習ポイント**:
- スキーマ定義
- 型安全なクエリ
- リレーション管理

**実装例**:
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  passwordHash String
  tasks        Task[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("users")
}

model Task {
  id        Int      @id @default(autoincrement())
  userId    Int
  title     String
  done      Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("tasks")
}
```

**Prisma クライアントの使用例**:
```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// 使用例
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: { tasks: true }
  });
}

export async function createUser(email: string, passwordHash: string) {
  return prisma.user.create({
    data: { email, passwordHash }
  });
}

export async function getTasksByUserId(userId: number) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}
```

#### 2. Neon PostgreSQL
**役割**: クラウドデータベースサービス
**学習ポイント**:
- サーバーレスPostgreSQL
- 自動スケーリング
- ブランチング機能

### Deployment技術

#### 1. Vercel
**役割**: ホスティングとデプロイメント
**学習ポイント**:
- 自動デプロイメント
- 環境変数管理
- Edge Functions

**設定例**:
```json
// vercel.json (オプション)
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

#### 2. GitHub Actions (自動CI/CD)
**役割**: 継続的インテグレーション・デプロイメント
**学習ポイント**:
- 自動テスト実行
- ビルド自動化
- デプロイメント自動化

## 🔒 セキュリティ実装

### 1. 認証セキュリティ
```typescript
// パスワード要件の検証
export function validatePassword(password: string): string[] {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('パスワードは8文字以上である必要があります');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('大文字を含む必要があります');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('小文字を含む必要があります');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('数字を含む必要があります');
  }
  
  return errors;
}

// メールアドレスの検証
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

### 2. HTTPセキュリティ
```typescript
// CSRFプロテクション（カスタムヘッダー確認）
export function validateCsrfToken(request: NextRequest): boolean {
  const csrfToken = request.headers.get('x-csrf-token');
  const expectedToken = process.env.CSRF_TOKEN;
  return csrfToken === expectedToken;
}

// レート制限
const rateLimitMap = new Map();

export function rateLimit(identifier: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, []);
  }
  
  const requests = rateLimitMap.get(identifier);
  const recentRequests = requests.filter((time: number) => time > windowStart);
  
  if (recentRequests.length >= limit) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);
  return true;
}
```

## 📱 レスポンシブデザイン実装

### Tailwind CSS レスポンシブパターン
```tsx
// モバイルファーストアプローチ
export default function ResponsiveLayout() {
  return (
    <div className="
      // モバイル (デフォルト)
      px-4 py-6 
      // タブレット (768px以上)
      md:px-8 md:py-8
      // デスクトップ (1024px以上)  
      lg:px-12 lg:py-12
      // 大画面 (1280px以上)
      xl:px-16 xl:py-16
    ">
      <div className="
        // グリッドレイアウト
        grid gap-4
        // モバイル: 1列
        grid-cols-1
        // タブレット: 2列
        md:grid-cols-2
        // デスクトップ: 3列
        lg:grid-cols-3
      ">
        {/* コンテンツ */}
      </div>
    </div>
  );
}
```

## 🧪 テスト戦略

### 1. ユニットテスト例
```typescript
// __tests__/auth.test.ts
import { hashPassword, verifyPassword } from '@/lib/auth';

describe('Authentication Functions', () => {
  test('password hashing and verification', async () => {
    const password = 'testPassword123';
    const hashedPassword = await hashPassword(password);
    
    expect(hashedPassword).not.toBe(password);
    expect(await verifyPassword(password, hashedPassword)).toBe(true);
    expect(await verifyPassword('wrongPassword', hashedPassword)).toBe(false);
  });
});
```

### 2. API テスト例
```typescript
// __tests__/api/tasks.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/tasks/route';

describe('/api/tasks', () => {
  test('GET returns tasks for authenticated user', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      cookies: { session: 'valid-jwt-token' }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toHaveProperty('tasks');
  });
});
```

## 🚀 パフォーマンス最適化

### 1. 画像最適化
```tsx
import Image from 'next/image';

export default function OptimizedImage() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={200}
      height={200}
      priority // 重要な画像の場合
      placeholder="blur" // ブラー効果
      blurDataURL="data:image/jpeg;base64,..." // ブラー用データ
    />
  );
}
```

### 2. 動的インポート
```tsx
import dynamic from 'next/dynamic';

// コンポーネントの遅延読み込み
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // サーバーサイドレンダリングを無効化
});

export default function Page() {
  return (
    <div>
      <h1>ページタイトル</h1>
      <HeavyComponent />
    </div>
  );
}
```

## 🛠️ 開発ツールとワークフロー

### 1. 開発用スクリプト
```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:reset": "prisma db push --force-reset"
  }
}
```

### 2. ESLint設定
```javascript
// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      "no-var": "error"
    }
  }
];

export default eslintConfig;
```

## 📊 モニタリングとロギング

### 1. エラーログ実装
```typescript
// src/lib/logger.ts
export class Logger {
  static error(message: string, error?: Error, context?: any) {
    console.error({
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message,
      error: error?.stack,
      context
    });
  }

  static info(message: string, context?: any) {
    console.log({
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message,
      context
    });
  }
}

// 使用例
try {
  await createTask(title);
} catch (error) {
  Logger.error('Failed to create task', error, { userId, title });
  throw error;
}
```

## 🌟 学習のための次のステップ

### 1. 機能拡張のアイデア
- [ ] タスクカテゴリ機能
- [ ] タスクの優先度設定
- [ ] タスクの期限設定
- [ ] チーム機能（複数ユーザー）
- [ ] リアルタイム同期（WebSocket）
- [ ] プッシュ通知
- [ ] オフライン対応（PWA）

### 2. 技術的改善点
- [ ] React Query / SWR による状態管理
- [ ] Zustand による グローバル状態管理
- [ ] Storybook による コンポーネント管理
- [ ] Cypress による E2E テスト
- [ ] Docker による 開発環境統一
- [ ] Redis による セッション管理
- [ ] GraphQL API の実装

### 3. 学習リソース
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Prisma**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel**: https://vercel.com/docs

## 💡 実装時のベストプラクティス

### 1. フォルダ構成
```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   ├── auth/           # 認証ページ
│   ├── dashboard/      # ダッシュボード
│   ├── globals.css     # グローバルスタイル
│   ├── layout.tsx      # ルートレイアウト
│   └── page.tsx        # ホームページ
├── components/         # 再利用可能コンポーネント
│   ├── ui/            # UI基本コンポーネント
│   └── features/      # 機能別コンポーネント
├── lib/               # ユーティリティ関数
│   ├── auth.ts        # 認証関連
│   ├── prisma.ts      # Prisma設定
│   └── session.ts     # セッション管理
├── types/             # TypeScript型定義
└── hooks/             # カスタムHooks
```

### 2. コミット規約
```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル修正
refactor: リファクタリング
test: テスト追加・修正
chore: ビルドプロセスやツール設定
```

このガイドを参考に、段階的に機能を実装していくことで、フルスタックWebアプリケーション開発の実践的なスキルを身につけることができます。

各セクションを深く学習し、実際にコードを書いて動作を確認することが重要です。また、エラーが発生した際は、ログを確認し、問題を特定して解決する経験を積むことで、より深い理解を得ることができるでしょう。