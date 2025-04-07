import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import RegModel from "./models/Reg.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: ["https://fullstack-101.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)


const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("The token was not avilable");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Token is wrong");
      }
      next();
    });
  }
};

app.post("/user/register", (req, res) => {
  const { name, email, password, skills} = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      RegModel.create({ name, email, password: hash , skills})
        .then((reg) => res.json(reg))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});
app.post("/user/login", (req, res) => {
    console.log("Login request received:", req.body); 
  const { email, password } = req.body;
  RegModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          res.json("success");
        } else {
          res.json("the password is incorrect");
        }
      });
    } else {
      res.json("No record Found");
    }
  });
});

app.get("/users", verifyUser, (req, res) => {
  RegModel.find()
    .then(users => res.json(users))         // ✅ Send the array of users
    .catch(err => res.status(500).json(err)); // Optional: Add status code for errors
});


app.listen(PORT,'0.0.0.0', () => {
  console.log(`http://localhost:3001`);
});
