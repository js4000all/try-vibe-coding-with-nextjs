import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BookList from "../BookList";
import { mockBooks } from "@/test/mocks/books";

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

    const editButton = screen.getAllByRole("button")[0];
    fireEvent.click(editButton);

    const textarea = screen.getByPlaceholderText("メモを入力してください");
    const saveButton = screen.getByRole("button", { name: "保存" });
    fireEvent.change(textarea, { target: { value: "新しいメモ" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/books/1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memo: "新しいメモ" }),
      });
    });
  });
});
