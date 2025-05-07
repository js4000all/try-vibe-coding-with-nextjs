import { z } from "zod";

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.array(z.string()).optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  publishedDate: z.string().optional(),
  publisher: z.string().optional(),
  pageCount: z.number().optional(),
  memo: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Book = z.infer<typeof bookSchema>;

export const createBookSchema = bookSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateBook = z.infer<typeof createBookSchema>;
