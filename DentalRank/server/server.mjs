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

/* req body should be a map with keys representing GPA, DAT etc.
   each mapping to an object with min and max values. 

   This is NOT in order (might be, but not necessarily)

   with these values, formulate a list of schools and return a list of 
   'school' objects. Each 'school' object should have the median gpa, dat etc

   list goes in order alphabetically

   ex return [
    {
      name: "Boston College",
      gpa: 3.86, 
      dat: 22
    },
    {
      name: "Tufts University",
      gpa: 3.94, 
      dat: 23
    }
  ]
  
*/
app.post("/schools", (req, res) => {
  // const { GPA, DAT, acceptanceRate, studentToFacultyRatio } = req.body;
  /* EXAMPLE BODY

  {
   "stu_fac":{"min":"2","max":"3"},
   "app_admit":{"min":"2","max":"3"},
   "dat":{"min":"2","max":"3"},
   "gpa":{"min":"2","max":"4"}
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
