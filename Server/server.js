const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.SERVER_PORT ?? 4001;

// ........................ express routes setup

const loginRoute = require("./routes/loginRoute");
const employeesRoute = require("./routes/employeesRoute");
const tableRoute = require("./routes/tableRoute");

app.use("/login", loginRoute);
app.use("/employees", employeesRoute);
app.use("/tableRoute", tableRoute);

const welcome = (_, res) => {
  res.send("Appointment System by Dejan Gogov, v1 ");
};

app.use("/", welcome);

app.listen(port, (err) => {
  err
    ? "Something bad happen"
    : "Server is listening on http://localhost:${port}/";
});
