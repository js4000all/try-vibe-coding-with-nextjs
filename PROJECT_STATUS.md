# プロジェクト状況

## プロジェクト概要

Next.js を使用した読書メモ管理アプリケーション

## 主要な構成物

### ディレクトリ構造

```
app/
├── src/
│   ├── components/     # Reactコンポーネント
│   ├── lib/           # ユーティリティ関数、モデル定義
│   └── pages/         # ページコンポーネント
├── public/            # 静的ファイル
└── tests/             # テストファイル
```

### 主要なファイル

- `app/src/lib/models/book.ts`: 書籍モデルの定義
- `app/src/components/MemoEditor.tsx`: メモ編集コンポーネント
- `app/src/components/__tests__/MemoEditor.test.tsx`: メモ編集コンポーネントのテスト

### 技術スタック

- Next.js
- TypeScript
- Jest + Testing Library
- Zod (バリデーション)

## 現在の課題

1. テスト環境の設定

   - Jest の設定
   - Babel の設定
   - TypeScript の設定

2. コンポーネントの実装
   - メモ編集機能
   - 書籍検索機能
   - 書籍一覧表示

## 次のステップ

1. テスト環境の整備
2. コンポーネントの実装
3. API の実装
4. データベースの設定

## 注意事項

- `.next`ディレクトリは git 管理から除外
- 環境変数は`.env`ファイルで管理
