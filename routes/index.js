const express = require("express");

const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const postRoutes = require("./post.route");
const uploadRoutes = require("./upload.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/uploads", uploadRoutes);

module.exports = router;
