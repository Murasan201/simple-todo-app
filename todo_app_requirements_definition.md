# 要件定義書：シンプルToDoアプリ

## 1. 概要

- **プロジェクト名**: シンプルToDoアプリ
- **目的**: ユーザーがタスクの追加・削除・完了管理を行える、レスポンシブ対応のToDoアプリをVercel上で開発・デプロイし、基本的な認証・データ永続化機能を検証する。
- **利用プラットフォーム**: Webブラウザ（PC、スマートフォン、タブレット）

## 2. 対象ユーザー

- 個人ユーザー（タスク管理初心者～中級者）
- モバイルでもPCでも手軽にタスク管理を行いたいユーザー

## 3. システム構成

```
[フロントエンド (Next.js + React + Tailwind)]
          ⇅
    [API (Next.js API Routes)]
          ⇅
[DB (MySQL via PlanetScale + Prisma ORM)]
```

- Vercel上のサーバーレス関数としてAPIをホスティング
- PlanetScaleをMySQL互換DBとして利用

## 4. 機能要件

### 4.1 認証機能

- メールアドレス＋パスワードによるサインアップ／ログイン
- セッション管理 (NextAuth.js Credentials)

### 4.2 タスク管理機能

- タスクの追加
- タスクの削除
- タスク完了／未完了の切り替え
- ローカルストレージへの一時保存 (オフライン対応)
- DBへの永続化(save/ load)

### 4.3 UI/UX

- レスポンシブデザイン (Tailwind CSS)
- モバイル・PC両対応レイアウト
- プレビュー環境のプレビューURL発行機能

## 5. 非機能要件

- **パフォーマンス**: 初回ロード 2秒以内、API応答 200ms以内
- **可用性**: 月間稼働率 99.9%以上
- **セキュリティ**: パスワードは bcrypt でハッシュ化、HTTPS必須
- **拡張性**: 機能追加時に容易にAPI Routesを追加可能
- **メンテナビリティ**: TypeScriptで型安全、ESLint/Prettierによるコード品質管理

## 6. 技術要件

- **フレームワーク**: Next.js (最新LTS)
- **言語**: TypeScript
- **UI**: React + Tailwind CSS
- **認証**: NextAuth.js (Credentials Provider)
- **ORM**: Prisma
- **DB**: PlanetScale (MySQL互換)
- **デプロイ**: Vercel (Hobbyプラン)

## 7. データベース設計（概略）

| テーブル名 | 主なカラム                              | 型                                    | コメント     |
| ----- | ---------------------------------- | ------------------------------------ | -------- |
| users | id, email, passwordHash            | INT, VARCHAR, VARCHAR                | ユーザー認証情報 |
| tasks | id, userId, title, done, createdAt | INT, INT, VARCHAR, BOOLEAN, DATETIME | タスク情報    |

## 8. API設計（概略）

| エンドポイント          | メソッド   | 機能             |
| ---------------- | ------ | -------------- |
| /api/auth/signup | POST   | ユーザー登録         |
| /api/auth/login  | POST   | ログイン           |
| /api/tasks       | GET    | 認証ユーザーのタスク一覧取得 |
| /api/tasks       | POST   | タスク追加          |
| /api/tasks/[id]  | PUT    | タスク更新（完了切替）    |
| /api/tasks/[id]  | DELETE | タスク削除          |

## 9. インターフェース設計

- **画面構成**: ログイン画面、タスク一覧画面、設定画面（オプション）
- **UIコンポーネント**: ヘッダー、タスクリスト、入力フォーム、ボタン、モーダル

## 10. 環境・運用

- **開発環境**: Node.js v16+, VSCode, ESLint, Prettier
- **ステージング**: Vercel Preview URL
- **本番環境**: Vercel Production
- **環境変数**: VERCEL\_URL, DATABASE\_URL, NEXTAUTH\_SECRET などをVercelで管理

## 11. セキュリティ要件

- HTTPS常時化
- パスワードハッシュ化（bcrypt）
- 環境変数の暗号管理
- API認証のJWT有効期限設定

## 12. テスト計画

- **ユニットテスト**: Jest + React Testing Library
- **E2Eテスト**: Cypress
- **APIテスト**: Postman Collections

## 13. デプロイ／CI/CD

- **Git連携**: GitHub ↔ Vercel（プッシュで自動ビルド・デプロイ）
- **プレビュー環境**: ブランチごとに自動発行

## 14. スケジュール／マイルストーン

| フェーズ      | 期間  |
| --------- | --- |
| 要件定義／設計   | 1週間 |
| 実装（基礎機能）  | 2週間 |
| 認証・DB連携実装 | 1週間 |
| テスト／修正    | 1週間 |
| デプロイ・最終検証 | 1週間 |

## 15. 実装バージョン履歴

### Version 1.0.0 (2025-01-14)

#### 実装済み機能
- ✅ **基本認証システム**: カスタムセッション管理による安全なログイン・ログアウト
- ✅ **ユーザー登録**: メールアドレス・パスワードによる新規ユーザー登録
- ✅ **タスク管理**: タスクの追加・削除・完了状態切り替え
- ✅ **レスポンシブUI**: PC・タブレット・スマートフォン対応
- ✅ **データ永続化**: Prisma ORM + MySQL（PlanetScale対応）
- ✅ **型安全**: TypeScript完全対応、ESLintエラーゼロ

#### 実装されたAPIエンドポイント
| エンドポイント | メソッド | 機能 | ステータス |
|---------------|---------|------|-----------|
| `/api/auth/signup` | POST | ユーザー登録 | ✅ |
| `/api/auth/login` | POST | ログイン | ✅ |
| `/api/auth/logout` | POST | ログアウト | ✅ |
| `/api/auth/me` | GET | ユーザー情報取得 | ✅ |
| `/api/tasks` | GET | タスク一覧取得 | ✅ |
| `/api/tasks` | POST | タスク追加 | ✅ |
| `/api/tasks/[id]` | PUT | タスク更新 | ✅ |
| `/api/tasks/[id]` | DELETE | タスク削除 | ✅ |

#### 実装されたページ
- ✅ **ホームページ** (`/`): ランディングページ、認証状態に応じたリダイレクト
- ✅ **ログインページ** (`/auth/signin`): メール・パスワード認証
- ✅ **登録ページ** (`/auth/signup`): 新規ユーザー登録
- ✅ **ダッシュボード** (`/dashboard`): メインのタスク管理画面

#### プロジェクト構成
```
/src
  /app
    /api
      /auth
        /login/route.ts
        /logout/route.ts
        /me/route.ts
        /signup/route.ts
      /tasks
        /[id]/route.ts
        /route.ts
    /auth
      /signin/page.tsx
      /signup/page.tsx
    /dashboard/page.tsx
    layout.tsx
    page.tsx
  /lib
    /session.ts
/prisma
  /schema.prisma
/.env (環境変数)
/package.json
```

#### 技術仕様（確定版）
- **Next.js**: 15.3.3 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Tailwind CSS**: 4.x
- **Prisma**: 6.9.0
- **bcryptjs**: 3.0.2（パスワードハッシュ化）

#### 未実装機能（今後のバージョンで対応予定）
- ⏳ ローカルストレージによるオフライン対応
- ⏳ Jest + React Testing Libraryによるユニットテスト
- ⏳ Cypressによるe2eテスト
- ⏳ タスクの編集機能
- ⏳ タスクの並び替え機能
- ⏳ タスクのカテゴリ分類

---

以上がシンプルToDoアプリの要件定義書です。ご確認ください。

