import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

let schools = ["A school", "B school", "C school", "D school"];

app.post("/schools", (req, res) => {
  // const { GPA, DAT, acceptanceRate, studentToFacultyRatio } = req.body;
  /* EXAMPLE BODY

  { "0": {"min":"0","max":"10"}, GPA
    "1": {"min":"1","max":"2"}, DAT
    "2": {"min":"1","max":"5"} Acceptance rate
    etc...
  }

 */

  try {
    // console.log(GPA, DAT, acceptanceRate, studentToFacultyRatio);
    res.json(schools);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
