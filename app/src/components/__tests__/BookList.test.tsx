import { render, screen, waitFor, act } from "@testing-library/react";
import BookList from "../BookList";
import { vi } from "vitest";

const mockBooks = [
  {
    id: "1",
    title: "テスト本1",
    authors: ["テスト著者1"],
    publisher: "テスト出版社1",
    imageUrl: "https://example.com/test1.jpg",
    memo: "テストメモ1",
  },
  {
    id: "2",
    title: "テスト本2",
    authors: ["テスト著者2"],
    publisher: "テスト出版社2",
    imageUrl: "https://example.com/test2.jpg",
    memo: "テストメモ2",
  },
];

describe("BookList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("読み込み中はローディング表示", () => {
    global.fetch = vi.fn().mockImplementation(() => new Promise(() => {}));
    render(<BookList />);
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();
  });

  it("エラー時はエラーメッセージを表示", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("テストエラー"));
    render(<BookList />);
    await waitFor(() => {
      expect(screen.getByText("テストエラー")).toBeInTheDocument();
    });
  });

  it("書籍が0件の場合はメッセージを表示", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });
    render(<BookList />);
    await waitFor(() => {
      expect(
        screen.getByText("保存された書籍はありません")
      ).toBeInTheDocument();
    });
  });

  it("書籍一覧が正しく表示される", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockBooks),
    });
    render(<BookList />);
    await waitFor(() => {
      expect(screen.getByText("テスト本1")).toBeInTheDocument();
      expect(screen.getByText("テスト本2")).toBeInTheDocument();
    });
  });

  it("メモ更新時にAPIが呼ばれる", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockBooks),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockBooks),
      });

    render(<BookList />);
    await waitFor(() => {
      expect(screen.getByText("テスト本1")).toBeInTheDocument();
    });

    const updateButton = screen.getAllByRole("button", { name: "保存" })[0];
    await act(async () => {
      updateButton.click();
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/books/1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memo: "テストメモ1" }),
      });
    });
  });
});
