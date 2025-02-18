import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import BookDetail from "./pages/book_detail";
import BookManage from "./pages/book_manage";
import BookAdd from "./pages/book_add";
import "../src/index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/book_manage/:id" element={<BookManage />} />
        <Route path="/book_add" element={<BookAdd />} />
      </Routes>
    </Router>
  );
}

export default App;
