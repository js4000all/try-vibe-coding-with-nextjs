import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BookCard from "../BookCard";
import { mockBook } from "@/test/mocks/books";

const mockOnMemoUpdate = vi.fn();

describe("BookCard", () => {
  it("書籍情報が正しく表示される", () => {
    render(<BookCard book={mockBook} onMemoUpdate={mockOnMemoUpdate} />);

    expect(screen.getByText("テスト本1")).toBeInTheDocument();
    expect(screen.getByText("テスト著者1")).toBeInTheDocument();
    expect(screen.getByText("テスト出版社1")).toBeInTheDocument();
    expect(screen.getByAltText("テスト本1")).toHaveAttribute(
      "src",
      "https://example.com/test1.jpg"
    );
  });

  it("メモエディタが正しく表示される", () => {
    render(<BookCard book={mockBook} onMemoUpdate={mockOnMemoUpdate} />);

    expect(screen.getByText("テストメモ1")).toBeInTheDocument();
  });

  it("メモ更新時にonMemoUpdateが呼ばれる", async () => {
    render(<BookCard book={mockBook} onMemoUpdate={mockOnMemoUpdate} />);

    const submitButton = screen.getByRole("button", { name: "保存" });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnMemoUpdate).toHaveBeenCalledWith("1", "テストメモ1");
  });
});
