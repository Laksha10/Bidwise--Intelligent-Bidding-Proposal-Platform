const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const auth = require("../middleware/auth");

// get current user's notifications
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// mark as read
router.post("/:id/read", auth, async (req, res) => {
  try {
    const note = await Notification.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Not found" });
    if (!note.user.equals(req.user._id)) return res.status(403).json({ message: "Not your notification" });
    note.read = true;
    await note.save();
    res.json({ message: "Marked read", note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;