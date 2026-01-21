const axios = require('axios');
const ServiceRequest = require('../models/ServiceRequest');
const Bid = require('../models/Bid');
const User = require('../models/User');

const AI_URL = "http://127.0.0.1:5001";

// FEATURE 1: Smart Notifications (Matches companies to a new job)
exports.getCompanyMatches = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await ServiceRequest.findById(requestId);
        if (!request) return res.status(404).json({ error: "Job request not found" });

        const companies = await User.find({ role: 'company' });

        const payload = {
            job_desc: `${request.title} ${request.description}`,
            companies: companies.map(c => ({
                id: c._id,
                name: c.name,
                bio: c.bio || "",
                skills: Array.isArray(c.skills) ? c.skills.join(" ") : (c.skills || "")
            }))
        };

        const response = await axios.post(`${AI_URL}/match_companies`, payload);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "AI Engine Offline", details: error.message });
    }
};

// FEATURE 2: Bid Analysis (Ranks bids for the seeker)
exports.getRankedBids = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await ServiceRequest.findById(requestId);
        if (!request) return res.status(404).json({ error: "Job request not found" });

        const bids = await Bid.find({ service: requestId }).populate('company');

        const payload = {
            job_desc: request.description,
            budget: request.budget || 0,
            bids: bids.map(b => ({
                id: b._id,
                text: b.details || "", 
                price: b.amount || 0,
                rating: b.company?.rating || 0
            }))
        };

        const response = await axios.post(`${AI_URL}/analyze_bids`, payload);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "AI Engine Offline", details: error.message });
    }
};