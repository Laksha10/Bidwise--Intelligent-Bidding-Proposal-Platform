const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  details: { type: String },
  accepted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Bid", bidSchema);