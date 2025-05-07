import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { Book } from "@/lib/models/book";
import { MemoEditor } from "./MemoEditor";

interface BookCardProps {
  book: Book;
  onMemoUpdate: (bookId: string, memo: string) => Promise<void>;
}

export default function BookCard({ book, onMemoUpdate }: BookCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex gap-4 p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
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
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              {book.title}
            </h3>
            {book.authors && book.authors.length > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {book.authors.join(", ")}
              </p>
            )}
            {book.publisher && (
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {book.publisher}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          {isEditing ? (
            <MemoEditor
              bookId={book.id}
              onSubmit={async (memo) => {
                await onMemoUpdate(book.id, memo);
                setIsEditing(false);
              }}
              initialContent={book.memo}
            />
          ) : (
            <div className="relative group">
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                {book.memo ? (
                  <p
                    className="whitespace-pre-wrap text-gray-900 dark:text-gray-100"
                    data-testid="memo-content"
                  >
                    {book.memo}
                  </p>
                ) : (
                  <p className="text-gray-400 dark:text-gray-600">
                    メモはありません
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
