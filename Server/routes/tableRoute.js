const express = require("express");
const router = express.Router();

const database = require("../Database/appointmenQuery");

router.get("/services", database.getAllServices);

module.exports = router;
