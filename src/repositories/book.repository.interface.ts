import type { Book } from "../types/book.js";

export interface BookRepository {
  findAll(): Book[];

  findById(id: number): Book | undefined;

  create(book: Book): Book;

  update(
    id: number,
    changes: Partial<Omit<Book, "id">>,
  ): Book | undefined;

  remove(id: number): boolean;
}