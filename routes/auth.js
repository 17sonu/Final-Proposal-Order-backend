const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
});

// Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = user;
    res.status(200).json({ message: "Logged in successfully" });
});

// Logout Route
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Error logging out" });
        res.status(200).json({ message: "Logged out successfully" });
    });
});

module.exports = router;