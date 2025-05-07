import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookSearch from "../BookSearch";
import { vi } from "vitest";
import * as booksApi from "@/lib/api/books";

const mockGoogleBook = {
  id: "1",
  title: "テスト本",
  authors: ["テスト著者"],
  description: "テスト説明",
  imageLinks: {
    thumbnail: "https://example.com/test.jpg",
  },
  publishedDate: "2024",
  publisher: "テスト出版社",
  pageCount: 100,
};

const mockSearchResults = [mockGoogleBook];

describe("BookSearch", () => {
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(booksApi, "searchBooks").mockResolvedValue(mockSearchResults);
    vi.spyOn(booksApi, "saveBook").mockResolvedValue(undefined);
  });

  it("検索フォームが表示される", () => {
    render(<BookSearch onSelect={mockOnSelect} />);
    expect(screen.getByPlaceholderText("書籍名で検索")).toBeInTheDocument();
  });

  it("検索実行時にAPIが呼ばれる", async () => {
    render(<BookSearch onSelect={mockOnSelect} />);
    const searchInput = screen.getByPlaceholderText("書籍名で検索");
    fireEvent.change(searchInput, { target: { value: "テスト" } });
    fireEvent.keyDown(searchInput, { key: "Enter" });

    await waitFor(() => {
      expect(booksApi.searchBooks).toHaveBeenCalledWith("テスト");
    });
  });

  it("検索結果が表示される", async () => {
    render(<BookSearch onSelect={mockOnSelect} />);
    const searchInput = screen.getByPlaceholderText("書籍名で検索");
    fireEvent.change(searchInput, { target: { value: "テスト" } });
    fireEvent.keyDown(searchInput, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("テスト本")).toBeInTheDocument();
      expect(screen.getByText("テスト著者")).toBeInTheDocument();
      expect(screen.getByText("テスト出版社")).toBeInTheDocument();
    });
  });

  it("書籍選択時にAPIが呼ばれる", async () => {
    render(<BookSearch onSelect={mockOnSelect} />);
    const searchInput = screen.getByPlaceholderText("書籍名で検索");
    fireEvent.change(searchInput, { target: { value: "テスト" } });
    fireEvent.keyDown(searchInput, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("テスト本")).toBeInTheDocument();
    });

    const bookElement = screen.getByText("テスト本").closest("div");
    fireEvent.click(bookElement!);

    await waitFor(() => {
      expect(booksApi.saveBook).toHaveBeenCalledWith({
        title: "テスト本",
        authors: ["テスト著者"],
        description: "テスト説明",
        imageUrl: "https://example.com/test.jpg",
        publishedDate: "2024",
        publisher: "テスト出版社",
        pageCount: 100,
      });
      expect(mockOnSelect).toHaveBeenCalledWith(mockGoogleBook);
    });
  });

  it("エラー時にエラーメッセージが表示される", async () => {
    vi.spyOn(booksApi, "saveBook").mockRejectedValue(new Error("テストエラー"));
    render(<BookSearch onSelect={mockOnSelect} />);
    const searchInput = screen.getByPlaceholderText("書籍名で検索");
    fireEvent.change(searchInput, { target: { value: "テスト" } });
    fireEvent.keyDown(searchInput, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("テスト本")).toBeInTheDocument();
    });

    const bookElement = screen.getByText("テスト本").closest("div");
    fireEvent.click(bookElement!);

    await waitFor(() => {
      expect(screen.getByText("書籍の保存に失敗しました")).toBeInTheDocument();
    });
  });
});
