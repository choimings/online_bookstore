import { Request, Response } from "express";
import Book from "../models/book";

// 📌 1. 전체 책 목록 조회 (cover_image_path, title, author만 조회)
export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await Book.findAll({
      attributes: ["book_id", "cover_image_path", "title", "author"],
    });
    res.status(200).json(books);
  } catch (error) {
    console.error("❌ [ERROR] GET /api/books:", error);
    res.status(500).json({ error: "서버 오류 발생" });
  }
};

// 📌 2. 특정 책 조회
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book = await Book.findByPk(req.params.id, {
      attributes: [
        "cover_image_path",
        "title",
        "author",
        "price",
        "description",
        "stock_quantity",
        "isbn",
        "published_date",
      ],
    });

    if (!book) {
      res.status(404).json({ message: "책을 찾을 수 없음" });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "서버 오류 발생" });
  }
};

// 📌 3. 책 추가
export const addBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      cover_image_path,
      title,
      author,
      price,
      description,
      stock_quantity,
      isbn,
      published_date,
    } = req.body;

    const newBook = await Book.create({
      cover_image_path,
      title,
      author,
      price,
      description,
      stock_quantity,
      isbn,
      published_date,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("❌ [ERROR] GET /api/books:", error);
    res.status(500).json({ error: "책을 추가하는 중 오류 발생" });
  }
};

// 📌 4. 책 수정
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      res.status(404).json({ message: "책을 찾을 수 없음" });
      return;
    }

    const {
      cover_image_path,
      title,
      author,
      price,
      description,
      stock_quantity,
      isbn,
      published_date,
    } = req.body;

    // 필수 필드 누락 여부 확인
    if (
      !cover_image_path ||
      !title ||
      !author ||
      price === undefined ||
      !description ||
      stock_quantity === undefined ||
      !isbn ||
      !published_date
    ) {
      res.status(400).json({ error: "필수 입력 값이 누락되었습니다." });
      return;
    }

    // 책 정보 업데이트
    await book.update({
      cover_image_path,
      title,
      author,
      price,
      description,
      stock_quantity,
      isbn,
      published_date,
    });

    res.status(200).json(book);
  } catch (error) {
    console.error("❌ [ERROR] PUT /api/books/:id:", error);
    res.status(500).json({ error: "책을 수정하는 중 오류 발생" });
  }
};

// 📌 5. 책 삭제
export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      res.status(404).json({ message: "책을 찾을 수 없음" });
      return;
    }
    await book.destroy();
    res.status(200).json({ message: "책 삭제 완료" });
  } catch (error) {
    res.status(500).json({ error: "책을 삭제하는 중 오류 발생" });
  }
};
