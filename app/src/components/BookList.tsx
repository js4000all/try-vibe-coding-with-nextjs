import { useState, useEffect } from "react";
import type { Book } from "@/lib/models/book";
import BookCard from "./BookCard";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      if (!response.ok) {
        throw new Error("書籍の取得に失敗しました");
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "予期せぬエラーが発生しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleMemoUpdate = async (bookId: string, memo: string) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memo }),
      });

      if (!response.ok) {
        throw new Error("メモの更新に失敗しました");
      }

      await fetchBooks();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "予期せぬエラーが発生しました"
      );
    }
  };

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (books.length === 0) {
    return <div>保存された書籍はありません</div>;
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onMemoUpdate={handleMemoUpdate} />
      ))}
    </div>
  );
}
