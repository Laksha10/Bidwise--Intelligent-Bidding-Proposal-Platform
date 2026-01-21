const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("⏳ Attempting MongoDB connection...");
    
    // Log the URI (hiding password for security) to see if it's local or cloud
    const uri = process.env.MONGO_URI || "";
    const safeUri = uri.includes("@") ? uri.split("@")[1] : uri;
    console.log(`📡 Targeting: ${safeUri}`);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These two lines are the "secret sauce" to fix SSL Alert 80 on local connections
      tls: false,
      ssl: false,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    
    if (error.message.includes("SSL alert number 80")) {
      console.log("\n💡 TIP: Your IP might not be whitelisted in MongoDB Atlas,");
      console.log("or you are trying to use SSL on a local connection.");
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;