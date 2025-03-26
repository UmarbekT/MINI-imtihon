const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.create({ username, email, password });
  res.status(201).json({ message: "User registered successfully", user });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const tokens = generateTokens(user);
  res.json(tokens);
});

const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const newTokens = generateTokens({ _id: decoded.id, email: decoded.email });

  res.json(newTokens);
});

const logout = asyncHandler(async (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = { register, login, refresh, logout };
