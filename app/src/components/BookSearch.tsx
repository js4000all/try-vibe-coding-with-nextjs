import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchBooks, saveBook } from "@/lib/api/books";
import type { Book as GoogleBook } from "@/lib/api/google-books";
import type { CreateBook } from "@/lib/models/book";

interface BookSearchProps {
  onSelect: (book: GoogleBook) => void;
}

export default function BookSearch({ onSelect }: BookSearchProps) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    const results = await searchBooks(query);
    setBooks(results);
    setIsLoading(false);
  };

  const handleBookSelect = async (book: GoogleBook) => {
    try {
      const bookData: CreateBook = {
        title: book.title,
        authors: book.authors,
        description: book.description,
        imageUrl: book.imageLinks?.thumbnail,
        publishedDate: book.publishedDate,
        publisher: book.publisher,
        pageCount: book.pageCount,
      };

      await saveBook(bookData);
      onSelect(book);
    } catch (error) {
      setError("書籍の保存に失敗しました");
      console.error("Error saving book:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="書籍名、著者名、ISBNで検索"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="mt-4 text-center text-gray-500">検索中...</div>
      )}

      {error && <div className="mt-4 text-center text-red-500">{error}</div>}

      {books.length > 0 && (
        <div className="mt-4 space-y-4">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookSelect(book)}
              className="flex gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              {book.imageLinks?.thumbnail && (
                <img
                  src={book.imageLinks.thumbnail}
                  alt={book.title}
                  className="w-20 h-28 object-cover"
                />
              )}
              <div>
                <h3 className="font-medium">{book.title}</h3>
                {book.authors && (
                  <p className="text-sm text-gray-600">
                    {book.authors.join(", ")}
                  </p>
                )}
                {book.publisher && (
                  <p className="text-sm text-gray-500">{book.publisher}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
