# 🧪 ローカルテストガイド

Simple Todo App をローカル環境でテストする方法を説明します。

## 🚀 クイックスタート

### 1. 自動セットアップ（推奨）
```bash
# ローカル開発環境を自動セットアップ
npm run setup:local

# 開発サーバーを起動
npm run dev
```

### 2. 手動セットアップ
```bash
# 1. SQLite用のスキーマに切り替え
cp prisma/schema.dev.prisma prisma/schema.prisma

# 2. Prismaクライアントを生成
npx prisma generate

# 3. データベースを作成
npx prisma db push

# 4. 開発サーバーを起動
npm run dev
```

## 📱 テスト手順

### 1. アプリケーションにアクセス
ブラウザで `http://localhost:3000` を開く

### 2. ユーザー登録テスト
1. 「新規登録」をクリック
2. メールアドレスとパスワードを入力
3. 登録ボタンをクリック
4. ログイン画面にリダイレクトされることを確認

### 3. ログインテスト
1. 登録したメールアドレスとパスワードでログイン
2. ダッシュボードにリダイレクトされることを確認

### 4. タスク管理テスト
1. **タスク追加**: 新しいタスクを入力して「追加」ボタンをクリック
2. **完了切り替え**: チェックボックスをクリックして完了状態を切り替え
3. **タスク削除**: 「削除」ボタンでタスクを削除
4. **データ永続化**: ページをリロードしてもタスクが保持されることを確認

### 5. ログアウトテスト
1. 「ログアウト」ボタンをクリック
2. ログイン画面にリダイレクトされることを確認

## 🛠️ 便利なコマンド

```bash
# データベースの中身を確認
npm run db:studio

# データベースをリセット
npm run db:reset

# ESLintチェック
npm run lint

# 本番ビルドテスト
npm run build
```

## 🗄️ データベース

- **場所**: `./prisma/dev.db`（SQLiteファイル）
- **管理**: Prisma Studio（`npm run db:studio`）
- **リセット**: `npm run db:reset`

## 📊 テスト項目チェックリスト

### ✅ 基本機能
- [ ] ユーザー登録
- [ ] ログイン/ログアウト
- [ ] タスクの追加
- [ ] タスクの削除
- [ ] タスクの完了切り替え
- [ ] データの永続化

### ✅ UI/UX
- [ ] レスポンシブデザイン（PC/タブレット/スマホ）
- [ ] エラーメッセージの表示
- [ ] ローディング状態の表示
- [ ] 直感的な操作感

### ✅ セキュリティ
- [ ] パスワードのハッシュ化
- [ ] セッション管理
- [ ] 不正アクセスの防止

## 🚨 トラブルシューティング

### データベース接続エラー
```bash
# Prismaクライアントを再生成
npx prisma generate
npx prisma db push
```

### ポート3000が使用中の場合
```bash
# 異なるポートで起動
npm run dev -- -p 3001
```

### 依存関係の問題
```bash
# node_modules を削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

## 🔄 本番環境への切り替え

ローカルテスト完了後、本番環境に戻すには：

```bash
# MySQL用のスキーマに戻す
cp prisma/schema.prisma.backup prisma/schema.prisma

# または手動で provider を "mysql" に変更
# datasource db {
#   provider = "mysql"
#   url      = env("DATABASE_URL")
#   relationMode = "prisma"
# }
```