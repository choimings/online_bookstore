import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const booksPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/books");
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error("❌ 책 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 검색어가 변경될 때 자동으로 필터링
  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  }, [searchTerm, books]); // 검색어 또는 책 목록이 변경될 때 실행

  // 페이지네이션 적용
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="p-8">
      {/* 헤더 */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">RGT Bookstore</h1>
        <div className="relative w-96 flex">
          <input
            type="text"
            placeholder="책 제목 또는 저자를 입력하세요..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setCurrentPage(1)}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            🔍
          </button>
        </div>
      </header>

      {/* 데이터 로딩 중 */}
      {loading ? (
        <p className="text-center text-gray-500">📚 책 목록을 불러오는 중...</p>
      ) : (
        <>
          <div className="grid grid-cols-5 gap-6">
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <div key={book.book_id} className="text-center">
                  <img
                    src={book.cover_image_path}
                    alt={book.title}
                    className="w-40 h-56 mx-auto mb-2 object-cover shadow-md"
                    onClick={() => navigate(`/book/${book.book_id}`)}
                  />
                  <h2 className="font-medium">{book.title}</h2>
                  <p className="text-gray-500">{book.author}</p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-5 text-gray-500">
                🔍 검색 결과가 없습니다.
              </p>
            )}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default Home;
