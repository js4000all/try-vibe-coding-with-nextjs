import { PencilIcon } from "@heroicons/react/24/outline";
import type { Book } from "@/lib/models/book";
import { MemoEditor } from "./MemoEditor";

interface BookCardProps {
  book: Book;
  onMemoUpdate: (bookId: string, memo: string) => Promise<void>;
}

export default function BookCard({ book, onMemoUpdate }: BookCardProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50">
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
              <p className="text-sm text-gray-600">{book.authors.join(", ")}</p>
            )}
            {book.publisher && (
              <p className="text-sm text-gray-500">{book.publisher}</p>
            )}
          </div>
        </div>
        <MemoEditor
          bookId={book.id}
          onSubmit={(memo) => onMemoUpdate(book.id, memo)}
          initialContent={book.memo}
        />
      </div>
    </div>
  );
}
