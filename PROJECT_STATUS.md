# プロジェクト状況

## プロジェクト概要

Next.js を使用した読書メモ管理アプリケーション

## 主要な構成物

### ディレクトリ構造

```
app/
├── src/
│   ├── components/     # Reactコンポーネント
│   │   ├── MemoEditor.tsx        # メモ編集コンポーネント
│   │   ├── BookCard.tsx         # 書籍カードコンポーネント
│   │   ├── BookList.tsx         # 書籍一覧コンポーネント
│   │   └── __tests__/           # コンポーネントテスト
│   ├── lib/           # ユーティリティ関数、モデル定義
│   ├── test/          # テスト設定
│   └── pages/         # ページコンポーネント
├── public/            # 静的ファイル
└── vitest.config.ts   # Vitestの設定
```

### 主要なファイル

- `app/src/lib/models/book.ts`: 書籍モデルの定義
- `app/src/components/MemoEditor.tsx`: メモ編集コンポーネント
- `app/src/components/BookCard.tsx`: 書籍カードコンポーネント
- `app/src/components/BookList.tsx`: 書籍一覧コンポーネント
- `app/src/components/__tests__/MemoEditor.test.tsx`: メモ編集コンポーネントのテスト
- `app/vitest.config.ts`: Vitest の設定ファイル
- `app/src/test/setup.ts`: テストのセットアップファイル

### 技術スタック

- Next.js
- TypeScript
- Vitest + Testing Library
- Zod (バリデーション)

## 現在の状況

1. テスト環境の整備

   - ✅ Vitest の設定完了
   - ✅ Testing Library の設定完了
   - ✅ JSDOM の設定完了

2. コンポーネントの実装

   - ✅ MemoEditor コンポーネントの実装
   - ✅ MemoEditor のテスト実装
   - ✅ BookCard コンポーネントの実装
   - ✅ BookList コンポーネントの実装
   - ⏳ 書籍検索機能
   - ⏳ 書籍一覧表示のテスト

3. バグ修正
   - ✅ MemoEditor の props 型の修正
   - ✅ 不要なインポートの削除
   - ✅ コンポーネント間の連携修正

## 次のステップ

1. 書籍検索機能の実装

   - 検索フォームの作成
   - Google Books API との連携
   - 検索結果の表示

2. 書籍一覧機能のテスト

   - BookCard のテスト作成
   - BookList のテスト作成
   - モックデータの準備

3. API の実装

   - エンドポイントの設計
   - バリデーション
   - エラーハンドリング

4. データベースの設定
   - スキーマ設計
   - マイグレーション
   - シードデータ

## 注意事項

- `.next`ディレクトリは git 管理から除外
- 環境変数は`.env`ファイルで管理
- Turbopack は現在無効化（Vitest との互換性のため）
