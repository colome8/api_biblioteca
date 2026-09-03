import type { Request, Response } from "express";
import { 
  getBooks,
  createBook,
  deleteBook,
  getBook,
  updateBook,
 } from "../services/book.service.js";

export function getAllBooks(req: Request, res: Response) {
  const author =
    typeof req.query.author === "string"
      ? req.query.author
      : undefined;

  let year: number | undefined;

  if (req.query.year !== undefined) {
    if (
      typeof req.query.year !== "string" ||
      req.query.year.trim() === ""
    ) {
      return res.status(400).json({
        message: "year must be a valid number",
      });
    }

    year = Number(req.query.year);

    if (!Number.isFinite(year) || year < 0) {
      return res.status(400).json({
        message: "year must be a valid number",
      });
    }
  }

  return res.status(200).json(
    getBooks({
      ...(author !== undefined && { author }),
      ...(year !== undefined && { year }),
    }),
  );
}

export const getOne = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = getBook(id);

  return res.status(200).json(book);
};

export const create = (req:Request, res:Response) => {
  const book = createBook(req.body);
  res.status(201).json(book);
};

export const remove = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  deleteBook(id);

  return res.status(204).send();
};

export const updateOne = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedBook = updateBook(id, req.body);

  return res.status(200).json(updatedBook);
};
