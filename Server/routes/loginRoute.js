const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const { verifyPassword, verifyToken, sendUserInfo } = require("../auth");
const database = require("../Database/loginQuery");

const loginLimit = rateLimit({
  windowMs: 7 * 60 * 1000, // 7 minutes
  max: 6, // max request 6  (per 7 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router
  .get("/", verifyToken, database.getUserIdNext, sendUserInfo)
  .post("/", database.findUserLogin, verifyPassword);

module.exports = router;
