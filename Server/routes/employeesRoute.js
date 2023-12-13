const express = require("express");
const router = express.Router();

const { hashedPassword, verifyToken } = require("../auth");
const database = require("../Database/employeesQuery");

router
  .get("/", verifyToken, database.getAllUsers)
  .post("/", verifyToken, hashedPassword, database.createEmployee)
  .get("/timeManagment", verifyToken, database.employeesTimeManagment);

module.exports = router;
