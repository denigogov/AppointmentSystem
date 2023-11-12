const express = require("express");
const router = express.Router();

const { verifyPassword, veryfyToken, sendUserInfo } = require("../auth");
const database = require("../Database/loginQuery");

router
  .get("/", veryfyToken, database.getUserIdNext, sendUserInfo)
  .post("/", database.findUserLogin, verifyPassword);

module.exports = router;
