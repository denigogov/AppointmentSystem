const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const { verifyPassword, verifyToken, sendUserInfo } = require("../auth");
const database = require("../Database/loginQuery");

const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 4, // max request 4  (per 15 minutes)
  strictTransportSecurity: false,
  standardHeaders: true,
  legacyHeaders: false,
});

router
  .get("/", verifyToken, database.getUserIdNext, sendUserInfo)
  .post("/", loginLimit, database.findUserLogin, verifyPassword);

module.exports = router;
