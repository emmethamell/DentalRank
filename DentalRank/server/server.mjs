import express from "express";
import cors from "cors";
import fs from 'fs';
import { getSchools } from './data/models.mjs'
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});


// TODO: update the req body so that the variable names match with data_json
app.post("/schools", async (req, res) => {
  const { stu_fac, app_admit, dat, gpa } = req.body;

  try {
    console.log(stu_fac, app_admit, dat, gpa);
    let schools = getSchools(stu_fac, app_admit, dat, gpa)
    res.json(schools);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
