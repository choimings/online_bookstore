import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookAdd: React.FC = () => {
  const [formData, setFormData] = useState({
    cover_image_path: "",
    title: "",
    author: "",
    price: "",
    description: "",
    stock_quantity: "",
    isbn: "",
    published_date: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 책 추가 요청
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8001/api/books",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ 책 추가 성공:", response.data);
      alert("📚 책이 성공적으로 추가되었습니다!");
      navigate("/"); // 홈 화면으로 이동
    } catch (error) {
      console.error("❌ 책 추가 중 오류 발생:", error);
      alert("책 추가 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">📖 새 책 추가</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="cover_image_path"
          placeholder="이미지 URL"
          value={formData.cover_image_path}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="책 제목"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="저자"
          value={formData.author}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="가격"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <textarea
          name="description"
          placeholder="책 설명"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md h-24"
          required
        />
        <input
          type="number"
          name="stock_quantity"
          placeholder="재고 수량"
          value={formData.stock_quantity}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="date"
          name="published_date"
          value={formData.published_date}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <button
          type="submit"
          className={`w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "📦 추가 중..." : "📚 책 추가하기"}
        </button>
      </form>
    </div>
  );
};

export default BookAdd;
