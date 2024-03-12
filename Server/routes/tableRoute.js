const express = require("express");
const router = express.Router();

const {
  validateCreateEmployerWorkTime,
  validateCreateNewService,
} = require("../Validations/tableQueryValidation");

const database = require("../Database/appointmenQuery");
const customerEmailConfirm = require("../Database/emailConfirm");
const customerQuery = require("../Database/customerQuery");
const appointmenQuery = require("../Database/appointmenQuery");
const accountsQuery = require("../Database/accountsQuery");
const employeeQuery = require("../Database/employeesQuery");

const { hashedPassword, verifyToken } = require("../auth");
const {
  validateCustomer,
  validateUpdateUser,
} = require("../Validations/tableQueryValidation");

router
  .get("/services/:id?", verifyToken, database.getAllServices)
  .put(
    "/services/:id",
    verifyToken,
    validateCreateNewService,
    database.updateServices
  )
  .post(
    "/services",
    verifyToken,
    validateCreateNewService,
    database.createNewservices
  )
  .delete("/services/:id", verifyToken, database.deleteServices)

  .get("/serviceemloyees/:id?", verifyToken, database.getServiceEmployeesJoin)
  .post("/serviceemloyees", verifyToken, database.addNewEmployeesService)
  .delete("/serviceemloyees/:id", verifyToken, database.deleteServiceEmployees)

  .post(
    "/customers",
    validateCustomer,
    hashedPassword,
    customerEmailConfirm.createCustomer
  )
  // .get("/confirm", customerEmailConfirm.customerConfirm) // not need to add verify token !
  .post("/confirm", customerEmailConfirm.confirmAccount)
  .delete("/customers/:id", verifyToken, customerQuery.deleteCustomer)
  .get("/customers/:id?/:type?", verifyToken, customerQuery.customerAllData)
  .get("/userTypes", verifyToken, employeeQuery.userTypesTable)
  .get("/customers-limit", verifyToken, customerQuery.allCustomersPagination)
  .get("/customersTop5", verifyToken, customerQuery.top5Customers)
  .get("/appointment", verifyToken, appointmenQuery.getAllAppointments)
  .post("/appointment", verifyToken, appointmenQuery.postAppointment)
  .delete("/appointment/:id", verifyToken, appointmenQuery.deleteAppointment)
  .get("/accounts/:id/:type", verifyToken, accountsQuery.editUserAllData)
  .put(
    "/accounts/:id/:type",
    validateUpdateUser,
    verifyToken,
    accountsQuery.updateUserData
  )
  .put("/timeManagement/:id", verifyToken, employeeQuery.UpdateTimeManagement)
  .post(
    "/timeManagement",
    verifyToken,
    validateCreateEmployerWorkTime,
    employeeQuery.createEmployerWorkTime
  )
  .post("/formMessage", customerEmailConfirm.formMessage);

module.exports = router;
