const { config } = require("dotenv");
const Sequelize = require('sequelize');
const { elasticClient } = require("./elasticClient");

config();
const { MY_SQL_USERNAME, MY_SQL_PASSWORD } = process.env;

const connectDb = async () => {
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
    sequelize.authenticate();
    console.log("MySQL Database connected successfully");
    await sequelize.sync();
    const res = await elasticClient.info();
    console.log(res,'elastic client details');
    console.log("MySql All models synced with db successfully");
  } catch (error) {
    console.log("Error connecting to MySQL db", error.message);
  }
};
exports.connectDb = connectDb;