const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const routes = require("../routes");
const errorHandler = require("../utils/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(routes);

app.use(errorHandler);

module.exports = app;
