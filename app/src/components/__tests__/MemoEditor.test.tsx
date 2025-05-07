import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoEditor } from "../MemoEditor";

describe("MemoEditor", () => {
  const mockOnSubmit = vi.fn();
  const defaultProps = {
    bookId: "test-book-id",
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("初期状態が正しく表示される", () => {
    render(<MemoEditor {...defaultProps} />);
    expect(
      screen.getByPlaceholderText("メモを入力してください")
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("保存");
  });

  it("メモを入力して送信できる", async () => {
    render(<MemoEditor {...defaultProps} />);

    const textarea = screen.getByPlaceholderText("メモを入力してください");
    const submitButton = screen.getByRole("button");

    fireEvent.change(textarea, { target: { value: "テストメモ" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith("テストメモ");
    });
  });

  it("空のメモを送信するとエラーが表示される", async () => {
    render(<MemoEditor {...defaultProps} />);

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("メモは1文字以上必要です")).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("送信中は入力とボタンが無効化される", async () => {
    mockOnSubmit.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<MemoEditor {...defaultProps} />);

    const textarea = screen.getByPlaceholderText("メモを入力してください");
    const submitButton = screen.getByRole("button");

    fireEvent.change(textarea, { target: { value: "テストメモ" } });
    fireEvent.click(submitButton);

    expect(textarea).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("送信中...");

    await waitFor(() => {
      expect(textarea).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent("保存");
    });
  });

  it("初期コンテンツが正しく表示される", () => {
    const initialContent = "初期メモ";
    render(<MemoEditor {...defaultProps} initialContent={initialContent} />);
    expect(screen.getByPlaceholderText("メモを入力してください")).toHaveValue(
      initialContent
    );
  });

  it("保存成功時にフォームがリセットされる", async () => {
    mockOnSubmit.mockResolvedValue(undefined);
    render(<MemoEditor {...defaultProps} />);

    const textarea = screen.getByPlaceholderText("メモを入力してください");
    const submitButton = screen.getByRole("button");

    fireEvent.change(textarea, { target: { value: "テストメモ" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(textarea).toHaveValue("");
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent("保存");
    });
  });

  it("保存成功時にエラーがクリアされる", async () => {
    mockOnSubmit.mockResolvedValue(undefined);
    render(<MemoEditor {...defaultProps} />);

    const textarea = screen.getByPlaceholderText("メモを入力してください");
    const submitButton = screen.getByRole("button");

    // 一度空メモで送信してエラーを表示
    fireEvent.click(submitButton);
    expect(screen.getByText("メモは1文字以上必要です")).toBeInTheDocument();

    // 有効なメモを送信
    fireEvent.change(textarea, { target: { value: "テストメモ" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText("メモは1文字以上必要です")
      ).not.toBeInTheDocument();
    });
  });
});
