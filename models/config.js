import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "postgres",
  username: process.env.userDB,
  password: process.env.passDB,
  host: process.env.hostDB,
  port: process.env.portDB,
});

export default sequelize;
