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
  // Route for services
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

  // Route for serviceEmployer which employer have which service

  // :id - employer id is
  .get("/serviceemloyees/:id?", verifyToken, database.getServiceEmployeesJoin)
  .put("/serviceemloyees/:id", verifyToken, database.updateServiceEmployees)
  .post("/serviceemloyees", verifyToken, database.addNewEmployeesService)
  .delete("/serviceemloyees/:id", verifyToken, database.deleteServiceEmployees)

  // Route related to customers
  .post(
    "/customers",
    validateCustomer,
    hashedPassword,
    customerEmailConfirm.createCustomer
  )
  .delete("/customers/:id", verifyToken, customerQuery.deleteCustomer)
  .get("/customers/:id?/:type?", verifyToken, customerQuery.customerAllData)
  .get("/userTypes", verifyToken, employeeQuery.userTypesTable)

  // pagination api
  .get("/customers-limit", verifyToken, customerQuery.allCustomersPagination)

  // chart route
  .get("/customersTop5", verifyToken, customerQuery.top5Customers)

  // customer email confirm
  .get("/confirm", customerEmailConfirm.customerConfirm) // not need to add verify token !

  // route for appointments
  .get("/appointment", verifyToken, appointmenQuery.getAllAppointments)
  .post("/appointment", verifyToken, appointmenQuery.postAppointment)
  .delete("/appointment/:id", verifyToken, appointmenQuery.deleteAppointment)

  // Route for Employers
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
  );

module.exports = router;
