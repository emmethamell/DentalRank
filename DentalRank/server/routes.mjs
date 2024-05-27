import express from "express";
import { getSchools } from "./data/models.mjs";
import { getDB } from "./db_models.mjs";
import { sendVerificationEmail } from "./email.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongodb from "mongodb";

const router = express.Router();


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

    res.send(`
    <h1>Email Verified Successfully!<h1>
    <p>Thanks for verifying your email. You can now log in <a href="http://www.dentalrank.us/signin">here</a>.<p> 
    
    `);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while verifying email" });
  }
});

//sign In
router.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "NO USER FOUND" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({ error: "WRONG PASSWORD" });
    }

    //if the password and user (email) match, create a token and set a cookie. Both expire in 10 days
    const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10d",
    });

    res.cookie("token", token, { httpOnly: false, secure: false, sameSite: 'lax', maxAge: 10 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: "Signed in successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while signing in" });
  }
});

//logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: false, secure: false, sameSite: 'lax',  maxAge: 10 * 24 * 60 * 60 * 1000 });
  res.status(200).json({ message: "Cookie Deleted"});
  res.end();
});

//get user account info
router.get("/api/get-user-info", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ _id: new mongodb.ObjectId(userId)});
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ error: "Cannot find user: " + err});
  }

});

//return true if token is valid
router.get("/set-authentication", async (req, res) => {
  const token = req.cookies.token;
  console.log("MY TOKEN: ", token);
  if (!token) {
    res.status(200).json(false);
  } else {
    res.status(200).json(true);
  }
});

//save ranking in database
router.put("/api/save-ranking", authenticateToken, async (req, res) => {
  const ranking = req.body;
  const userId = req.user.id;

  try {
    const db = getDB();
    const user = await db.collection("users").findOneAndUpdate(
      { _id: new mongodb.ObjectId(userId) },
      { $push: { rankings: ranking } },
      { returnOriginal: false }
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: "Server error"})
  }
  res.status(200).json({ message: "EVERYTHING OK" });
});


//authenticated the token: set req.user to obj with token attribute
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });

}

export default router;
