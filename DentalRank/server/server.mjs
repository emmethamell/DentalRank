import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes.mjs";
import { connectDB } from "./db_models.mjs";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: true, //TODO: Change before production to only allow requests where front end is hosted
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())
app.use(router);

connectDB();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});