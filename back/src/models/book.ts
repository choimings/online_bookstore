import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/database"; // DB 연결 설정

class Book extends Model {}

Book.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cover_image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false, // 💡 `null`이 들어가면 안 됨!
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
    timestamps: false, // 필요에 따라 true로 설정
  }
);

export default Book;
