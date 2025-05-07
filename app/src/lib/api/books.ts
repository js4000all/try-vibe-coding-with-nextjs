import axios from "axios";
import type { Book as GoogleBook } from "./google-books";
import type { CreateBook } from "../models/book";

const GOOGLE_BOOKS_API_BASE_URL = "https://www.googleapis.com/books/v1";

export interface Book {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail?: string;
  };
  publishedDate?: string;
  publisher?: string;
  pageCount?: number;
}

export interface BooksResponse {
  items: {
    id: string;
    volumeInfo: Omit<GoogleBook, "id">;
  }[];
  totalItems: number;
}

export const searchBooks = async (query: string): Promise<GoogleBook[]> => {
  try {
    const response = await axios.get<BooksResponse>(
      `${GOOGLE_BOOKS_API_BASE_URL}/volumes`,
      {
        params: {
          q: `intitle:${query}`,
          key: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY,
        },
      }
    );

    return response.data.items.map((item) => ({
      id: item.id,
      ...item.volumeInfo,
    }));
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};

export const saveBook = async (book: CreateBook): Promise<void> => {
  try {
    await axios.post("/api/books", book);
  } catch (error) {
    console.error("Error saving book:", error);
    throw error;
  }
};
