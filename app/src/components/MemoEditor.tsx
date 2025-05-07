import { useState } from "react";

interface MemoEditorProps {
  bookId: string;
  onSubmit: (memo: string) => Promise<void>;
  initialContent?: string;
}

export function MemoEditor({
  bookId,
  onSubmit,
  initialContent = "",
}: MemoEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError("メモは1文字以上必要です");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit(content);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="メモを入力してください"
        disabled={isSubmitting}
        className="w-full h-32 p-2 border rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? "送信中..." : "保存"}
      </button>
    </div>
  );
}
