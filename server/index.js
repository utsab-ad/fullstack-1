import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import RegModel from "../models/Reg.js";
import { createServerlessExpressMiddleware } from "@vendia/serverless-express/middleware";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://fullstack-101.vercel.app",
  credentials: true,
}));

// MongoDB Connection (cache the connection for serverless)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

app.use(async (req, res, next) => {
  await connectMongo();
  next();
});

// Auth middleware
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Routes
app.post("/user/register", async (req, res) => {
  const { name, email, password, skills } = req.body;

  try {
    const existing = await RegModel.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await RegModel.create({ name, email, password: hash, skills });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await RegModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "No record found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", verifyUser, async (req, res) => {
  try {
    const users = await RegModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export as a Vercel serverless function
export default createServerlessExpressMiddleware(app);
