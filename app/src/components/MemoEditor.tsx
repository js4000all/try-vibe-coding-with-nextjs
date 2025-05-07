import { useState } from "react";
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Book } from "@/lib/models/book";

interface MemoEditorProps {
  book: Book;
  onUpdate: (bookId: string, memo: string) => Promise<void>;
}

export default function MemoEditor({ book, onUpdate }: MemoEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [memoText, setMemoText] = useState(book.memo || "");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMemoText(book.memo || "");
  };

  const handleSave = async () => {
    await onUpdate(book.id, memoText);
    setIsEditing(false);
  };

  return (
    <div className="mt-2">
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={memoText}
            onChange={(e) => setMemoText(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            rows={3}
            placeholder="メモを入力..."
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleSave}
              className="p-1 text-blue-500 hover:text-blue-700"
            >
              <CheckIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          <div className="flex-1">
            {book.memo ? (
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {book.memo}
              </p>
            ) : (
              <p className="text-sm text-gray-400">メモはありません</p>
            )}
          </div>
          <button
            onClick={handleEditClick}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
