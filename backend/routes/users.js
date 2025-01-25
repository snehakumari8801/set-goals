const express = require("express");
const bcrypt = require('bcryptjs');
;const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

require("dotenv").config();

// Sign Up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: err.message });
  }
});

console.log(process.env.JWT_SECRET);

// Sign In
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error("Error during sign-in:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("goals");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new user
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email, goals: [] });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API Route to get user with goal tracking information
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("goals");
    if (!user) return res.status(404).json({ message: "User not found" });

    let totalGoals = 0;
    let completedGoals = 0;

    user.goals.forEach((goal) => {
      totalGoals += 1;
      if (goal.status === "Completed") {
        completedGoals += 1;
      }
    });

    const completionPercentage =
      totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

    res.json({
      user,
      totalGoals,
      completedGoals,
      completionPercentage,
    });
  } catch (err) {
    console.error("Error fetching user details with goal tracking:", err);
    res.status(500).json({ message: err.message });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = router;
