import type { Request , Response, NextFunction } from "express";

export const validateBook = (req:Request, res: Response, next: NextFunction) => {
    if (
      typeof req.body !== "object" ||
      req.body === null ||
      Array.isArray(req.body)
    ) {
        return res.status(400).json({
            message: "body must be a JSON object",
        });
    }

    const allowedFields = ["title", "author", "year"];
    const invalidField = Object.keys(req.body).find(
      (field) => !allowedFields.includes(field),
    );

    if (invalidField) {
        return res.status(400).json({
            message: `field '${invalidField}' is not allowed`,
        });
    }

    const {title, author, year} = req.body;
    if(!title || !author || typeof title !== "string" || title.trim() === "" || typeof author !== "string" || author.trim() === "") {
        return res.status(400).json({
            message: "title and author are required and cannot be empty",
        });
    }

    if (typeof year !== "number" || !Number.isFinite(year) || year < 0) {
        return res.status(400).json({
            message: "year must be a valid number",
        });
    }

    next();
};

export const validateBookUpdate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    typeof req.body !== "object" ||
    req.body === null ||
    Array.isArray(req.body)
  ) {
    return res.status(400).json({
      message: "body must be a JSON object",
    });
  }

  const allowedFields = ["title", "author", "year"];
  const receivedFields = Object.keys(req.body);

  if (receivedFields.length === 0) {
    return res.status(400).json({
      message: "at least one field must be provided",
    });
  }

  const invalidField = receivedFields.find(
    (field) => !allowedFields.includes(field),
  );

  if (invalidField) {
    return res.status(400).json({
      message: `field '${invalidField}' cannot be modified`,
    });
  }

  const { title, author, year } = req.body;

  if (title !== undefined &&
      (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({
      message: "title must be a non-empty string",
    });
  }

  if (author !== undefined &&
      (typeof author !== "string" || author.trim() === "")) {
    return res.status(400).json({
      message: "author must be a non-empty string",
    });
  }

  if (year !== undefined &&
      (typeof year !== "number" || !Number.isFinite(year) || year < 0)) {
    return res.status(400).json({
      message: "year must be a valid number",
    });
  }

  next();
};
