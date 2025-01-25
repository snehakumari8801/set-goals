const mongoose = require("mongoose");
const Goal = require("./Goal");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  goals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
