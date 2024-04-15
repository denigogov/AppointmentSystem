const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const cron = require("node-cron");
const fetch = require("node-fetch"); // Import fetch

const { verifyPassword, verifyToken, sendUserInfo } = require("../auth");
const database = require("../Database/loginQuery");

//block too many request !
const loginLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 40, // max request 40  (per 15 minutes)
  message: "You have exceeded the 100 requests in 24 hrs limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

router
  .get("/", verifyToken, database.getUserIdNext, sendUserInfo)
  // .post("/", loginLimit, database.findUserLogin, verifyPassword);
  .post("/", database.findUserLogin, verifyPassword);

// Simulate a login request because backend server goes to sleep after 15 minutes of inactivity and takes some time to wake up -- I'm using free version of render ! just for showcase(portfolio project)
//every 12 minutes!
cron.schedule("*/12 * * * *", async () => {
  try {
    await fetch("https://appointmentsystem-gcyv.onrender.com/login", {
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
