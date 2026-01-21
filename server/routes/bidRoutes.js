const express = require("express");
const router = express.Router();
const Bid = require("../models/Bid");
const ServiceRequest = require("../models/ServiceRequest");
const Notification = require("../models/Notification");
const auth = require("../middleware/auth");
const aiController = require("../controllers/aiController");

// Company places bid for a service
router.post("/:serviceId", auth, async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Only companies can place bids" });
    }

    const { amount, details } = req.body;
    const service = await ServiceRequest.findById(req.params.serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const bid = await Bid.create({
      service: service._id,
      company: req.user._id,
      amount,
      details
    });

    // 1. Create database notification (persistent)
    const notificationData = {
      user: service.seeker,
      message: `${req.user.name} placed a bid of ₹${amount} on your service "${service.title}"`,
      link: `/services/${service._id}`
    };
    await Notification.create(notificationData);

    // 2. ⚡ Emit real-time notification via Socket.io
    const io = req.app.get("io"); // Get the socket instance we set in server.js
    if (io) {
      io.emit("new_bid_notification", {
        ...notificationData,
        price: amount,
        serviceTitle: service.title
      });
    }

    res.json({ message: "Bid placed", bid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get bids for a service
router.get("/service/:serviceId", auth, async (req, res) => {
  try {
    const bids = await Bid.find({ service: req.params.serviceId }).populate("company", "name email");
    res.json(bids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seeker accepts a bid
router.post("/:bidId/accept", auth, async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId).populate("service").populate("company");
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    if (!bid.service.seeker.equals(req.user._id)) {
      return res.status(403).json({ message: "Only seeker who posted the service can accept bids" });
    }

    bid.accepted = true;
    await bid.save();

    const service = await ServiceRequest.findById(bid.service._id);
    service.status = "awarded";
    await service.save();

    // 1. Create database notification for company
    const notificationData = {
      user: bid.company._id,
      message: `Your bid for "${service.title}" was accepted by ${req.user.name}`,
      link: `/bids/${bid._id}`
    };
    await Notification.create(notificationData);

    // 2. ⚡ Emit real-time "Bid Accepted" notification
    const io = req.app.get("io");
    if (io) {
      io.emit("bid_accepted_notification", notificationData);
    }

    res.json({ message: "Bid accepted", bid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// AI ranking route
router.get("/service/:requestId/ai-ranked", auth, aiController.getRankedBids);

module.exports = router;