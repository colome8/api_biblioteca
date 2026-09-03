import type { Book } from "../types/book.js";
import type { BookRepository } from "./book.repository.interface.js";

let books: Book[] = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2003
  },
  {
    id: 2,
    title: "Design Patterns",
    author: "Erich Gamma",
    year: 2005
  },
];

// Repository es solamente para trabajar con los datos (queries, etc)

// get all books
export function findAll(): Book[] {
  return books;
}

// Get book by id query
export const findById = (id: number) => books.find((book) => book.id === id); 

// post new book query 
export const create = (book:Book) => {
  books.push(book);
  return book;
}; 

// delete book by id query
export const remove = (id: number) => 
  {const exists = books.some((book) => book.id === id); 
  if (!exists) return false;
  books = books.filter((book) => book.id !== id);
  return true;
};

// actualizacion de datos de libro mediante PATCH
export const update = (
  id: number,
  changes: Partial<Omit<Book, "id">>, // excluye el campo de id, para no cambiar el id, los demas son opcionales.
): Book | undefined => { // devuelve o un book actualizado, si lo encuentra, o undefined si no existe.
  const book = findById(id);

  if (!book) {
    return undefined;
  }

  const updatedBook: Book = { // nuevo objeto, libro actualizado.
    ...book, // copia datos originales
    ...changes, // copia encima los cambios enviados
    id,
  };

  books = books.map((currentBook) => // recorremos todos los libros
    currentBook.id === id ? updatedBook : currentBook // si se tiene el mismo id, el libro original se reemplaza por el updatedBook
  );

  return updatedBook;
};

export const bookRepository: BookRepository = {
  findAll,
  findById,
  create,
  update,
  remove,
};
