const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // 👈 Required to make logins work
const User = require('./models/User');
const ServiceRequest = require('./models/ServiceRequest');
const Bid = require('./models/Bid');

const MONGO_URI = "mongodb://127.0.0.1:27017/bidwise"; 

async function seedData() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🌱 Connected to MongoDB. Preparing Automated AI Test Data...");

        // 1. Clean up existing test data to avoid duplicates
        await User.deleteMany({ email: { $regex: "@test.com" } });
        await ServiceRequest.deleteMany({ _id: "696fae0ebc1cdae70daefe80" });
        await Bid.deleteMany({ service: "696fae0ebc1cdae70daefe80" });

        // 2. Hash Password for all test users
        const salt = await bcrypt.genSalt(10);
        const hashedHeader = await bcrypt.hash("password123", salt);

        // 3. Create a Seeker
        const seeker = await User.create({
            name: "John Seeker",
            email: "seeker@test.com",
            password: hashedHeader,
            role: "seeker"
        });

        // 4. Create the Service Request with the FIXED ID you requested
        const job = await ServiceRequest.create({
            _id: "696fae0ebc1cdae70daefe80", // 👈 The specific ID for your AI URL
            title: "Modern Portfolio Website",
            description: "I need a portfolio with 3D animations using Three.js and React. High performance is a must.",
            budget: 8000,
            seeker: seeker._id,
            status: "open"
        });

        // 5. Create 3 Companies for Ranking Comparisons
        const companies = await User.insertMany([
            {
                name: "ThreeJS Experts",
                email: "expert@test.com",
                password: hashedHeader,
                role: "company"
            },
            {
                name: "Basic Web Solutions",
                email: "basic@test.com",
                password: hashedHeader,
                role: "company"
            },
            {
                name: "Lowballer Inc",
                email: "cheap@test.com",
                password: hashedHeader,
                role: "company"
            }
        ]);

        // 6. Create Bids (This will trigger the AI Ranking)
        await Bid.insertMany([
            {
                service: job._id,
                company: companies[0]._id, // The Expert
                amount: 7500,
                details: "I have extensive experience with Three.js and Framer Motion. I can deliver a high-performance 3D portfolio with smooth animations."
            },
            {
                service: job._id,
                company: companies[1]._id, // The Basic
                amount: 4000,
                details: "I can build a nice responsive website for you using standard HTML and CSS templates."
            },
            {
                service: job._id,
                company: companies[2]._id, // The Lowballer
                amount: 500,
                details: "I do very fast work. Cheap price. Pick me."
            }
        ]);

        console.log("--- SEEDING COMPLETE ---");
        console.log(`✅ Fixed Job ID: ${job._id}`);
        console.log(`📧 Seeker Login: seeker@test.com / password123`);
        console.log(`📧 Company Login: expert@test.com / password123`);
        console.log("------------------------");
        
        process.exit();
    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seedData();