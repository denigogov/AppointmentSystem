const express = require("express");
const router = express.Router();

const database = require("../Database/appointmenQuery");
const customerDatabase = require("../Database/customerQuery");
const { hashedPassword, veryfyToken } = require("../auth");
const { validateCustomer } = require("../Validations/tableQueryValidation");

router
  .get("/services", database.getAllServices)
  .get("/serviceemloyees", database.getServiceEmployeesJoin)
  .post(
    "/customers",
    validateCustomer,
    hashedPassword,
    customerDatabase.createCustomer
  )
  .get("/confirm", customerDatabase.customerConfirm);

module.exports = router;
