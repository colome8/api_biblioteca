import { Router } from "express";
import { 
    getAllBooks,
    getOne,
    create,
    remove,
    updateOne,
 } from "../controllers/book.controller.js";
 import { validateBook, validateBookUpdate } from "../middleware/validateBook.middleware.js"
 import { validateId } from "../middleware/validateId.middleware.js";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", validateId, getOne);
router.post("/", validateBook, create);
router.delete("/:id", validateId, remove);
router.patch("/:id", validateId, validateBookUpdate, updateOne);

export default router;
