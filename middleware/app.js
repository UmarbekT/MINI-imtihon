const express = require("express");
let app = express();

app.get("*", (req, res, next) => {
  res.status(200).json({ status: "Succes", message: "Hi,World!" });
});

module.exports = app;
