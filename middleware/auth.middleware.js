const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/user.model");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await userModel.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
});

module.exports = auth;
