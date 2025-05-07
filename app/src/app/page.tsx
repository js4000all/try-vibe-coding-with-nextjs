"use client";

import BookSearch from "@/components/BookSearch";
import type { Book } from "@/lib/api/books";

export default function Home() {
  const handleBookSelect = (book: Book) => {
    console.log("Selected book:", book);
    // TODO: 選択された書籍の情報を保存する処理を実装
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">読書メモ</h1>
      <BookSearch onSelect={handleBookSelect} />
    </main>
  );
}
