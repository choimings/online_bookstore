import { Sequelize } from "sequelize";

const sequelize = new Sequelize("online_bookstore", "postgres", "ms519", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false, // 콘솔 로그 제거
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

export default sequelize;
