const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const { verifyPassword, verifyToken, sendUserInfo } = require("../auth");
const database = require("../Database/loginQuery");

const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // max request 4  (per 15 minutes)
  standardHeaders: true,
  legacyHeaders: true,
});

router
  .get("/", verifyToken, database.getUserIdNext, sendUserInfo)
  // .post("/", loginLimit, database.findUserLogin, verifyPassword);
  .post("/", database.findUserLogin, verifyPassword);

module.exports = router;
