const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  budget: { type: Number },
  deadline: { type: Date },
  seeker: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["open", "awarded", "closed"], default: "open" }
}, { timestamps: true });

module.exports = mongoose.model("ServiceRequest", serviceSchema);