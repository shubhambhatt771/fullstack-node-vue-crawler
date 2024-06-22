import { config } from "dotenv";
import { Sequelize } from "sequelize";
config();
const { MY_SQL_USERNAME, MY_SQL_PASSWORD } = process.env;

export const connectDb = async () => {
  const sequelize = new Sequelize(
    "companies",
    MY_SQL_USERNAME,
    MY_SQL_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
    }
  );
  try {
    await sequelize.authenticate();
    console.log("MySQL Database connected successfully");
  } catch (error) {
    console.log("Error connecting to MySQL db", error.message);
  }
};
