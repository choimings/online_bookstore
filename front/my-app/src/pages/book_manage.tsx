import React from "react";
import { useParams } from "react-router-dom";

const BookManage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">📖 책 관리 페이지</h1>
      <p className="mt-4">수정할 책 ID: {id}</p>
    </div>
  );
};

export default BookManage;
