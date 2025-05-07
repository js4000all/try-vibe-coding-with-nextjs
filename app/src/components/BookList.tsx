import { useEffect, useState } from "react";
import type { Book } from "@/lib/models/book";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError("書籍の取得に失敗しました");
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (isLoading) {
    return <div className="text-center text-gray-500">読み込み中...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (books.length === 0) {
    return (
      <div className="text-center text-gray-500">
        保存された書籍はありません
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50"
        >
          {book.imageUrl && (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-20 h-28 object-cover"
            />
          )}
          <div>
            <h3 className="font-medium">{book.title}</h3>
            {book.authors && book.authors.length > 0 && (
              <p className="text-sm text-gray-600">{book.authors.join(", ")}</p>
            )}
            {book.publisher && (
              <p className="text-sm text-gray-500">{book.publisher}</p>
            )}
            {book.memo && (
              <p className="mt-2 text-sm text-gray-700">{book.memo}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
