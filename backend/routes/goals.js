const express = require("express");
const User = require("../models/User");
const Goal = require("../models/Goal");
const router = express.Router();

router.post("/:userId/goals", async (req, res) => {
  const { userId } = req.params;
  const { title, deadline, status } = req.body;

  console.log(title.deadline, status);

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newGoal = new Goal({ title, deadline, status });

    await newGoal.save();

    user.goals.push(newGoal._id);
    await user.save();

    const updatedUser = await User.findById(userId).populate("goals");
    res.status(201).json(updatedUser);
    console.log(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
