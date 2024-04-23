import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

let db;

const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("dentalrank");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

export const getDB = () => db;