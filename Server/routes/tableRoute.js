const express = require("express");
const router = express.Router();

const database = require("../Database/appointmenQuery");
const customerEmailConfirm = require("../Database/emailConfirm");
const customerQuery = require("../Database/customerQuery");
const { hashedPassword, veryfyToken } = require("../auth");
const { validateCustomer } = require("../Validations/tableQueryValidation");

router
  .get("/services", database.getAllServices)
  .get("/serviceemloyees", database.getServiceEmployeesJoin)
  .post(
    "/customers",
    validateCustomer,
    hashedPassword,
    customerEmailConfirm.createCustomer
  )
  .get("/confirm", customerEmailConfirm.customerConfirm)
  .get("/customers/:id/:type", veryfyToken, customerQuery.customerAllData);

module.exports = router;
