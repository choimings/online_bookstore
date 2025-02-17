import React, { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  book_id: number;
  cover_image_path: string;
  title: string;
  author: string;
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10; // 한 페이지당 10개

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("❌ 책 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 페이지네이션: 데이터 슬라이싱
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="p-8">
      {/* 헤더 */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">RGT Bookstore</h1>
        <div className="relative w-96">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-2 text-gray-500">🔍</button>
        </div>
      </header>

      {/* 데이터 로딩 중 */}
      {loading ? (
        <p className="text-center text-gray-500">📚 책 목록을 불러오는 중...</p>
      ) : (
        <>
          <div className="grid grid-cols-5 gap-6">
            {currentBooks.map((book) => (
              <div key={book.book_id} className="text-center">
                <img
                  src={book.cover_image_path}
                  alt={book.title}
                  className="w-40 h-56 mx-auto mb-2 object-cover shadow-md"
                />
                <h2 className="font-medium">{book.title}</h2>
                <p className="text-gray-500">{book.author}</p>
              </div>
            ))}
          </div>

          {/* 페이지네이션 (디자인 유지) */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-md mx-1 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
