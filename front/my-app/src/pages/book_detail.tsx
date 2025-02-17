import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface BookDetail {
  cover_image_path: string;
  title: string;
  author: string;
  price: number;
  description: string;
  stock_quantity: number;
  isbn: string;
  published_date: string;
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/books/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("❌ 책 정보를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">📖 책 정보를 불러오는 중...</p>
    );
  }

  if (!book) {
    return (
      <p className="text-center text-red-500">❌ 책 정보를 찾을 수 없습니다.</p>
    );
  }

  return (
    <div className="p-8">
      {/* 헤더 추가 */}
      <header className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          RGT Bookstore
        </h1>
        <div className="relative w-96">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-2 text-gray-500">🔍</button>
        </div>
      </header>

      {/* 책 상세 정보 */}
      <div className="flex">
        {/* 책 이미지 */}
        <div className="w-1/3 flex flex-col items-center">
          <img
            src={book.cover_image_path}
            alt={book.title}
            className="w-60 h-80 object-cover shadow-md"
          />
          <button className="mt-4 px-4 py-2 bg-gray-300 text-black rounded-md">
            책 정보 수정하기
          </button>
        </div>

        {/* 책 정보 */}
        <div className="w-2/3 ml-10">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <h2 className="text-lg text-gray-600 mt-2">책 상세 정보</h2>

          <div className="mt-4 space-y-2 text-lg">
            <p>
              <strong>책 이름:</strong> {book.title}
            </p>
            <p>
              <strong>책 저자:</strong> {book.author}
            </p>
            <p>
              <strong>가격:</strong> {book.price.toLocaleString()} 원
            </p>
            <p>
              <strong>책 소개:</strong> {book.description}
            </p>
            <p>
              <strong>책 수량:</strong> {book.stock_quantity} 권
            </p>
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>발행일자:</strong> {book.published_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
