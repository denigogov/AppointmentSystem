const express = require("express");
const router = express.Router();

const database = require("../Database/appointmenQuery");
const customerEmailConfirm = require("../Database/emailConfirm");
const customerQuery = require("../Database/customerQuery");
const appointmenQuery = require("../Database/appointmenQuery");
const { hashedPassword, veryfyToken } = require("../auth");
const { validateCustomer } = require("../Validations/tableQueryValidation");

router
  .get("/services", veryfyToken, database.getAllServices)
  .get("/serviceemloyees", veryfyToken, database.getServiceEmployeesJoin)
  .post(
    "/customers",
    validateCustomer,
    hashedPassword,
    customerEmailConfirm.createCustomer
  )
  .get("/confirm", customerEmailConfirm.customerConfirm) // not need to add verify token !
  .get("/customers/:id/:type", veryfyToken, customerQuery.customerAllData)
  .get("/appointment", veryfyToken, appointmenQuery.getAllAppointments)
  .post("/appointment", veryfyToken, appointmenQuery.postAppointment);

module.exports = router;
