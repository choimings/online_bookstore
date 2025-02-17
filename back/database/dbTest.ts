import { connectDB } from "./database";

const testConnection = async () => {
  await connectDB();
};

testConnection();
