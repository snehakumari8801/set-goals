const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["In Progress", "Completed"],
    default: "In Progress",
  },
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
