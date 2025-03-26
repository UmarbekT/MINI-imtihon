const asyncHandler = require("express-async-handler");

const me = asyncHandler(async (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  });
});

module.exports = { me };
