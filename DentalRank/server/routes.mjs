import express from "express";
import { getSchools } from "./data/models.mjs";
import { getDB } from "./db_models.mjs";
import { sendVerificationEmail } from "./email.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = express.Router();

// TODO: update the req body so that the variable names match with data_json
router.post("/schools", async (req, res) => {
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
router.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(20).toString("hex");

    const user = {
      name,
      email,
      password: hashedPassword,
      token,
      emailVerified: false,
    };
    const db = getDB()
    const result = await db.collection("users").insertOne(user);

    sendVerificationEmail(email, token);

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while signing up" });
  }
});

//verify email
router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "No Token" });
  }

  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ token });

    if (!user) {
      return res.status(400).json({ error: "Invalid token" });
    }

    await db
      .collection("users")
      .updateOne({ token }, { $set: { emailVerified: true } });

    res.send("Email verified successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while verifying email" });
  }
});


router.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDB();
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Signed in successfully", token, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while signing in" });
  }
});

export default router;
