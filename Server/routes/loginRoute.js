const express = require("express");
const router = express.Router();

const { verifyPassword, verifyToken, sendUserInfo } = require("../auth");
const database = require("../Database/loginQuery");

router
  .get("/", verifyToken, database.getUserIdNext, sendUserInfo)
  .post("/", database.findUserLogin, verifyPassword);

module.exports = router;
