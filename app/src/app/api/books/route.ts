import { NextResponse } from "next/server";
import { createBookSchema } from "@/lib/models/book";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createBookSchema.parse(body);

    const book = await prisma.book.create({
      data: validatedData,
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error saving book:", error);
    return NextResponse.json({ error: "Failed to save book" }, { status: 500 });
  }
}
