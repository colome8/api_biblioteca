import { bookRepository } from "../repositories/book.repository.js";
import type { Book } from "../types/book.js";
import { AppError } from "../errors/app.error.js";

interface BookFilters {
  author?: string;
  year?: number;
}

export function getBooks(filters: BookFilters = {}) {
  const books = bookRepository.findAll();

  return books.filter((book) => {
    const matchesAuthor =
      filters.author === undefined ||
      book.author
        .toLowerCase()
        .includes(filters.author.toLowerCase());

    const matchesYear =
      filters.year === undefined ||
      book.year === filters.year;

    return matchesAuthor && matchesYear;
  });
}

export const getBook = (id: number) => {
  const book = bookRepository.findById(id);

  if (!book) {
    throw new AppError(404, "Book not found");
  }

  return book;
};

export const createBook = (book: Book) => {
  const newBook = {
    ...book,
    id: Date.now(),
  };
  return bookRepository.create(newBook);
};

export const deleteBook = (id: number) => {
  const deleted = bookRepository.remove(id);

  if (!deleted) {
    throw new AppError(404, "Book not found");
  }
};

export const updateBook = (
  id: number,
  changes: Partial<Omit<Book, "id">>,
) => {
  const updatedBook = bookRepository.update(id, changes);

  if (!updatedBook) {
    throw new AppError(404, "Book not found");
  }

  return updatedBook;
};


