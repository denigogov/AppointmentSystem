const express = require("express");
const router = express.Router();

const { hashedPassword, verifyToken } = require("../auth");
const database = require("../Database/employeesQuery");
const appointmenQuery = require("../Database/appointmenQuery");

router
  .get("/", verifyToken, database.getAllUsers) // I don't use anywere but I will use in OWNER DASHBOARD
  .post("/", verifyToken, hashedPassword, database.createEmployee) // I don't use anywere but I will use in OWNER DASHBOARD
  .get("/timeManagment", verifyToken, database.employeesTimeManagment)
  .get("/appointmentRange/:id", appointmenQuery.getAllAppointmentByDataRange);

module.exports = router;
