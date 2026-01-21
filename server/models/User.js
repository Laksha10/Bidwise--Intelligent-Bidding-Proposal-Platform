const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["seeker", "company"],
      default: "seeker",
      required: true,
    },
    // --- ADD THESE FOR THE AI ---
    bio: { type: String, default: "" },
    skills: { type: [String], default: [] }, // Array of strings e.g. ["React", "Node"]
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);