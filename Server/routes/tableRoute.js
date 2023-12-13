const express = require("express");
const router = express.Router();

const database = require("../Database/appointmenQuery");
const customerEmailConfirm = require("../Database/emailConfirm");
const customerQuery = require("../Database/customerQuery");
const appointmenQuery = require("../Database/appointmenQuery");
const accountsQuery = require("../Database/accountsQuery");

const { hashedPassword, verifyToken } = require("../auth");
const {
  validateCustomer,
  validateUpdateUser,
} = require("../Validations/tableQueryValidation");

router
  .get("/services", verifyToken, database.getAllServices)
  .get("/serviceemloyees", verifyToken, database.getServiceEmployeesJoin)
  .post(
    "/customers",
    validateCustomer,
    hashedPassword,
    customerEmailConfirm.createCustomer
  )
  .get("/confirm", customerEmailConfirm.customerConfirm) // not need to add verify token !
  .get("/customers/:id/:type", verifyToken, customerQuery.customerAllData)
  .get("/appointment", verifyToken, appointmenQuery.getAllAppointments)
  .post("/appointment", verifyToken, appointmenQuery.postAppointment)
  .delete("/appointment/:id", verifyToken, appointmenQuery.deleteAppointment)
  .get("/accounts/:id/:type", verifyToken, accountsQuery.editUserAllData)
  .put(
    "/accounts/:id/:type",
    validateUpdateUser,
    verifyToken,
    accountsQuery.updateUserData
  );

module.exports = router;
