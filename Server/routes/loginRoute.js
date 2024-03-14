const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const cron = require("node-cron");

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

// Simulate a login request because backend server goes to sleep after 15 minutes of inactivity and takes some time to wake up -- I'm using free version of render ! just for showcase(portfolio project)
//every 12 minutes!
cron.schedule("*/12 * * * *", async () => {
  try {
    await fetch("https://salonpro.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "ownerview@salonpro.com",
        password: "deni123!",
      }),
    });
  } catch (error) {
    console.error("Error during scheduled login:", error.message);
  }
});

module.exports = router;
