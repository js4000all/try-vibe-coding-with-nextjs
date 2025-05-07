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
      <div className="space-y-8">
        <BookSearch onSelect={handleBookSelect} />
        <BookList />
      </div>
    </main>
  );
}
