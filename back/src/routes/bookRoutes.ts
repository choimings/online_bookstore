import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";

const router = Router();

router.get("/books", getAllBooks); // 전체 책 목록 조회
router.get("/books/:id", getBookById); // 특정 책 조회
router.post("/books", addBook); // 추가
router.put("/books/:id", updateBook); // 수정
router.delete("/books/:id", deleteBook); // 삭제

export default router;
