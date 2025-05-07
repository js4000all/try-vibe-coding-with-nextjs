import { render, screen, fireEvent, act } from "@testing-library/react";
import BookCard from "../BookCard";
import type { Book } from "@/lib/models/book";

const mockBook: Book = {
  id: "1",
  title: "テスト本",
  authors: ["テスト著者"],
  publisher: "テスト出版社",
  imageUrl: "https://example.com/test.jpg",
  memo: "テストメモ",
};

const mockOnMemoUpdate = vi.fn();

describe("BookCard", () => {
  it("書籍情報が正しく表示される", () => {
    render(<BookCard book={mockBook} onMemoUpdate={mockOnMemoUpdate} />);

    expect(screen.getByText("テスト本")).toBeInTheDocument();
    expect(screen.getByText("テスト著者")).toBeInTheDocument();
    expect(screen.getByText("テスト出版社")).toBeInTheDocument();
    expect(screen.getByAltText("テスト本")).toHaveAttribute(
      "src",
      "https://example.com/test.jpg"
    );
  });

  it("メモエディタが正しく表示される", () => {
    render(<BookCard book={mockBook} onMemoUpdate={mockOnMemoUpdate} />);

    expect(screen.getByText("テストメモ")).toBeInTheDocument();
  });

  it("メモ更新時にonMemoUpdateが呼ばれる", async () => {
    render(<BookCard book={mockBook} onMemoUpdate={mockOnMemoUpdate} />);

    const submitButton = screen.getByRole("button", { name: "保存" });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnMemoUpdate).toHaveBeenCalledWith("1", "テストメモ");
  });
});
