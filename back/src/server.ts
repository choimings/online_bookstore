import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
import { connectDB } from "../database/database";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// DB 연결
connectDB();

// API 엔드포인트 추가
app.use("/api", bookRoutes);

// 기본 라우트 (테스트용)
app.get("/", (req, res) => {
  res.send("📚 Welcome to the Bookstore API!");
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
