import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes.mjs";
import { connectDB } from "./db_models.mjs";

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(router);

connectDB();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});