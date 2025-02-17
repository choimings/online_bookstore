import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// JSON 요청을 처리할 수 있도록 설정
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
