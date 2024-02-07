const express = require("express");
const router = express.Router();

const { hashedPassword, verifyToken } = require("../auth");
const database = require("../Database/employeesQuery");
const appointmenQuery = require("../Database/appointmenQuery");
const chartQuery = require("../Database/chartQuery");

router
  .get("/", verifyToken, database.getAllEmployees) // I don't use anywere but I will use in OWNER DASHBOARD
  .post("/", verifyToken, hashedPassword, database.createEmployee) // I don't use anywere but I will use in OWNER DASHBOARD
  .get("/timeManagment/:id?", verifyToken, database.employeesTimeManagment)
  .get(
    "/appointmentRange/:id",
    verifyToken,
    appointmenQuery.getAllAppointmentByDataRange
  )
  .get(
    "/serviceStatistic/:id?",
    verifyToken,
    appointmenQuery.getServiceStatisticProcent
  )
  .get(
    "/appointmentsByHourRange/:id?",
    verifyToken,
    appointmenQuery.getAppointmentByHourRange
  )
  .get(
    "/appointmentByDay/:id?",
    verifyToken,
    appointmenQuery.countAppointmentsByWeekDay
  )

  .get(
    "/appointmentsTotal/:id?",
    verifyToken,
    appointmenQuery.countTotalAppointments
  )
  .get("/totalMoneyAppService", verifyToken, chartQuery.totalMoneyAppService)
  .get("/dataByService", verifyToken, chartQuery.dataByService)
  .get("/serviceByMonth", verifyToken, chartQuery.serviceByMonth);

module.exports = router;
