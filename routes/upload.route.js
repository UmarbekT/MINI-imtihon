const express = require("express");
const { uploadImage } = require("../controller/upload.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../utils/upload");

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), uploadImage);

module.exports = router;
