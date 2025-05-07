import type { Book } from "@/lib/models/book";
import type { Book as GoogleBook } from "@/lib/api/google-books";

export const mockBook: Book = {
  id: "1",
  title: "テスト本1",
  authors: ["テスト著者1"],
  publisher: "テスト出版社1",
  imageUrl: "https://example.com/test1.jpg",
  memo: "テストメモ1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockBooks: Book[] = [
  mockBook,
  {
    id: "2",
    title: "テスト本2",
    authors: ["テスト著者2"],
    publisher: "テスト出版社2",
    imageUrl: "https://example.com/test2.jpg",
    memo: "テストメモ2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockGoogleBook: GoogleBook = {
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

export const mockSearchResults = [mockGoogleBook];
