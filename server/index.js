// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import RegModel from "./models/Reg.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Enable CORS for Vercel frontend
app.use(cors({
  origin: "https://fullstack-101.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));

// Optional: Allow preflight (OPTIONS)
app.options("*", cors({
  origin: "https://fullstack-101.vercel.app",
  credentials: true
}));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB error:", err));

// 🔒 Middleware to verify token
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// 🔐 Register Route
app.post("/user/register", async (req, res) => {
  const { name, email, password, skills } = req.body;

  try {
    const existing = await RegModel.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const newUser = await RegModel.create({ name, email, password: hash, skills });

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});

// 🔐 Login Route
app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await RegModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "No record found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // ✅ Secure cookie config
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ✅ Protected Route
app.get("/users", verifyUser, async (req, res) => {
  try {
    const users = await RegModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// 🟢 Start the server (on Vercel this is handled differently, but fine for dev)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
