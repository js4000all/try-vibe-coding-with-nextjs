import { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import type { Book } from "@/lib/models/book";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [memoText, setMemoText] = useState("");

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

  const handleEditClick = (book: Book) => {
    setEditingBookId(book.id);
    setMemoText(book.memo || "");
  };

  const handleSaveMemo = async (bookId: string) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memo: memoText }),
      });

      if (!response.ok) {
        throw new Error("Failed to update memo");
      }

      const updatedBook = await response.json();
      setBooks(
        books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      );
      setEditingBookId(null);
    } catch (error) {
      setError("メモの保存に失敗しました");
      console.error("Error saving memo:", error);
    }
  };

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
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{book.title}</h3>
                {book.authors && book.authors.length > 0 && (
                  <p className="text-sm text-gray-600">
                    {book.authors.join(", ")}
                  </p>
                )}
                {book.publisher && (
                  <p className="text-sm text-gray-500">{book.publisher}</p>
                )}
              </div>
              <button
                onClick={() => handleEditClick(book)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
            {editingBookId === book.id ? (
              <div className="mt-2">
                <textarea
                  value={memoText}
                  onChange={(e) => setMemoText(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="メモを入力..."
                />
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setEditingBookId(null)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={() => handleSaveMemo(book.id)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    保存
                  </button>
                </div>
              </div>
            ) : (
              book.memo && (
                <p className="mt-2 text-sm text-gray-700">{book.memo}</p>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
