const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  // 1. Get the Authorization Header
  const authHeader = req.headers.authorization;
  
  // 2. Check if the header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // 3. Extract the actual token
  const token = authHeader.split(" ")[1];

  try {
    // 4. Verify the token using the secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Find the user in the database and attach to request object
    // We select("-password") to ensure we don't pass sensitive data down the line
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "User not found or invalid token." });
    }

    // Attach user and role to the request for use in routes (like bidRoutes.js)
    req.user = user;
    
    next(); // Move to the actual route controller
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    
    // Handle expired vs. invalid tokens specifically
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }
    
    return res.status(401).json({ message: "Token invalid or tampered with." });
  }
};

module.exports = auth;