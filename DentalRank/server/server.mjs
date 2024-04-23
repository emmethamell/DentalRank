import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import { getSchools } from "./data/models.mjs";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import session from 'express-session';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3001;
dotenv.config({ path: "../.env" });

app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let db;

const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  db = client.db("dentalrank");
  console.log("Connected to MongoDB");
} catch (error) {
  console.error(error);
}

// TODO: update the req body so that the variable names match with data_json
app.post("/schools", async (req, res) => {
  const { stu_fac, app_admit, dat, gpa } = req.body;

  try {
    console.log(stu_fac, app_admit, dat, gpa);
    let schools = getSchools(stu_fac, app_admit, dat, gpa);
    res.json(schools);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

//user signup
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(20).toString('hex');

    const user = { name, email, password: hashedPassword, token, emailVerified: false };
    const result = await db.collection("users").insertOne(user);

    const msg = {
      to: email, 
      from: "noreply@dentalrank.us", 
      subject: "Email Verification",                       //TODO: Remember to change form local host to where server is running, redirect to home page as well
      text: `Please verify your email address by clicking on the following link: http://localhost:3001/verify-email?token=${token}`,
      html: `<p>Please verify your email address by clicking on the following link: <a href="http://localhost:3001/verify-email?token=${token}">Verify Email</a></p>`,
    };

    sgMail.send(msg).then(() => {
      console.log('Email sent')
    }).catch((error) => {
      console.error(error)
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while signing up" });
  }
});


//verify email
app.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "No Token" });
  }

  try {
    const user = await db.collection("users").findOne({ token });

    if (!user) {
      return res.status(400).json({ error: "Invalid token" });
    }

    await db.collection("users").updateOne({ token }, { $set: { emailVerified: true } });

    res.send("Email verified successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while verifying email" });
  }
});


app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;


  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      //handle if user doesnt match
      return res.status(400).json({ error: "user no matchy" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      //handle if password doesnt match
      return res.status(400).json({ error: "password no matchy " });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Signed in successfully", token, name: user.name });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while signing in" });
  }

});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
