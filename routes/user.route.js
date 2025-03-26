const express = require("express");
const { me } = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/me", authMiddleware, me);

module.exports = router;
