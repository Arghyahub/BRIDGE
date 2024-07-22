import dotenv from "dotenv";
dotenv.config();

const Constants = {
  PORT: process.env.PORT,
  API: process.env.XY_API,
};

export default Constants;
