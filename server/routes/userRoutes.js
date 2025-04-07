import express from "express";
import RegModel from "../models/RegModel.js"; // adjust the path if needed

const router = express.Router();

// GET /users - fetch all users
router.get("/users", async (req, res) => {
    try {
        const users = await RegModel.find({}, 'name email'); // only select name and email
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err });
    }
});

export default router;
