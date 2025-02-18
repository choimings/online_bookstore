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

const BookManage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [updatedBook, setUpdatedBook] = useState<Partial<BookDetail>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/books/${id}`
        );
        setBook(response.data);
        setUpdatedBook(response.data);
      } catch (error) {
        console.error("❌ 책 정보를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdate = async (field: keyof BookDetail) => {
    try {
      await axios.put(`http://localhost:8001/api/books/${id}`, {
        ...book,
        [field]: updatedBook[field],
      });
      setBook((prev) =>
        prev ? { ...prev, [field]: updatedBook[field] } : null
      );
      setEditMode((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error("❌ 책 정보를 수정하는 중 오류 발생:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 책을 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`http://localhost:8001/api/books/${id}`);
      alert("책이 삭제되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("❌ 책을 삭제하는 중 오류 발생:", error);
    }
  };

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
      {/* 헤더 */}
      <header className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          RGT Bookstore - 책 관리
        </h1>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={handleDelete}
        >
          책 삭제하기 🗑
        </button>
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
        </div>

        {/* 책 정보 및 수정 버튼 */}
        <div className="w-2/3 ml-10 space-y-4">
          {Object.keys(book).map((key) => {
            const field = key as keyof BookDetail;
            return (
              <div key={key} className="flex items-center">
                <strong className="w-32">{key.replace("_", " ")}:</strong>
                {editMode[field] ? (
                  <input
                    type={
                      field === "price" || field === "stock_quantity"
                        ? "number"
                        : "text"
                    }
                    value={updatedBook[field] as string | number}
                    onChange={(e) =>
                      setUpdatedBook((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 w-full"
                  />
                ) : (
                  <span>{book[field]}</span>
                )}
                <button
                  className="ml-4 px-2 py-1 bg-gray-300 rounded-md"
                  onClick={() => {
                    if (editMode[field]) {
                      handleUpdate(field);
                    } else {
                      setEditMode((prev) => ({ ...prev, [field]: true }));
                    }
                  }}
                >
                  {editMode[field] ? "저장" : "수정"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookManage;
