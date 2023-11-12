const express = require("express");
const router = express.Router();

const { hashedPassword, veryfyToken } = require("../auth");
const database = require("../Database/employeesQuery");

router
  .get("/", veryfyToken, database.getAllUsers)
  .post("/", veryfyToken, hashedPassword, database.createEmployee);

module.exports = router;
