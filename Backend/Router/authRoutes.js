// backend/Router/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Make sure this path is correct

const router = express.Router();

// === SIGNUP ROUTE ===
router.post("/signup", async (req, res) => {
  try {
    const { name, gender, email, password } = req.body;

    if (!name || !gender || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Let Mongoose schema hash password using pre-save hook
    const newUser = new User({ name, gender, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

// === LOGIN ROUTE ===
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret", // fallback if .env is missing
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

module.exports = router;
