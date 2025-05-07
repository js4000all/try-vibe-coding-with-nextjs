import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BookCard from "../BookCard";
import { mockBook } from "@/test/mocks/books";

describe("BookCard", () => {
  const mockOnMemoUpdate = vi.fn();

  beforeEach(() => {
    mockOnMemoUpdate.mockClear();
  });

  it("書籍情報が正しく表示される", () => {
    render(<BookCard book={mockBook} onMemoUpdate={mockOnMemoUpdate} />);

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    if (mockBook.authors) {
      expect(screen.getByText(mockBook.authors.join(", "))).toBeInTheDocument();
    }
    if (mockBook.publisher) {
      expect(screen.getByText(mockBook.publisher)).toBeInTheDocument();
    }
    if (mockBook.imageUrl) {
      expect(screen.getByAltText(mockBook.title)).toHaveAttribute(
        "src",
        mockBook.imageUrl
      );
    }
  });

  it("メモがない場合は「メモはありません」と表示される", () => {
    const bookWithoutMemo = { ...mockBook, memo: "" };
    render(<BookCard book={bookWithoutMemo} onMemoUpdate={mockOnMemoUpdate} />);

    expect(screen.getByText("メモはありません")).toBeInTheDocument();
  });

  it("メモがある場合は内容が表示される", () => {
    const bookWithMemo = { ...mockBook, memo: "テストメモ" };
    render(<BookCard book={bookWithMemo} onMemoUpdate={mockOnMemoUpdate} />);

    expect(screen.getByText("テストメモ")).toBeInTheDocument();
  });

  it("編集ボタンをクリックするとメモエディタが表示される", () => {
    render(<BookCard book={mockBook} onMemoUpdate={mockOnMemoUpdate} />);

    const editButton = screen.getByRole("button");
    fireEvent.click(editButton);

    expect(
      screen.getByPlaceholderText("メモを入力してください")
    ).toBeInTheDocument();
  });

  it("メモを保存すると編集モードが終了する", async () => {
    mockOnMemoUpdate.mockResolvedValue(undefined);
    render(<BookCard book={mockBook} onMemoUpdate={mockOnMemoUpdate} />);

    // 編集モードを開始
    const editButton = screen.getByRole("button");
    fireEvent.click(editButton);

    // メモを入力して保存
    const textarea = screen.getByPlaceholderText("メモを入力してください");
    const saveButton = screen.getByRole("button", { name: "保存" });
    fireEvent.change(textarea, { target: { value: "新しいメモ" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText("メモを入力してください")
      ).not.toBeInTheDocument();
      expect(mockOnMemoUpdate).toHaveBeenCalledWith(mockBook.id, "新しいメモ");
    });
  });

  it("メモの改行が保持される", () => {
    const bookWithMultilineMemo = {
      ...mockBook,
      memo: "1行目\n2行目\n3行目",
    };
    render(
      <BookCard book={bookWithMultilineMemo} onMemoUpdate={mockOnMemoUpdate} />
    );

    const memoElement = screen.getByTestId("memo-content");
    expect(memoElement.textContent).toBe("1行目\n2行目\n3行目");
  });
});
