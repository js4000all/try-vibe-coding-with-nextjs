"use client";

import { useState } from "react";
import BookSearch from "@/components/BookSearch";
import BookList from "@/components/BookList";
import type { Book as GoogleBook } from "@/lib/api/google-books";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<GoogleBook | null>(null);

  const handleBookSelect = (book: GoogleBook) => {
    setSelectedBook(book);
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">読書メモ</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="lg:sticky lg:top-8">
          <h2 className="text-xl font-semibold mb-4">書籍検索</h2>
          <BookSearch onSelect={handleBookSelect} />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">保存済み書籍</h2>
          <div className="lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto">
            <BookList />
          </div>
        </section>
      </div>
    </main>
  );
}
