const express = require("express");
const router = express.Router();
const ServiceRequest = require("../models/ServiceRequest");
const auth = require("../middleware/auth");
aiController = require("../controllers/aiController");
// Create a new service request (seeker)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "seeker") return res.status(403).json({ message: "Only seekers can post requests" });
    const { title, description, budget, deadline } = req.body;
    const srv = await ServiceRequest.create({
      title, description, budget, deadline, seeker: req.user._id
    });
    return res.json({ message: "Service posted", service: srv });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all open services
router.get("/", auth, async (req, res) => {
  try {
    const services = await ServiceRequest.find().populate("seeker", "name email").sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get services posted by current seeker
router.get("/my", auth, async (req, res) => {
  try {
    const services = await ServiceRequest.find({ seeker: req.user._id }).sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single service
router.get("/:id", auth, async (req, res) => {
  try {
    const service = await ServiceRequest.findById(req.params.id).populate("seeker", "name email");
    if (!service) return res.status(404).json({ message: "Not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:requestId/ai-matches", auth, aiController.getCompanyMatches);
module.exports = router;