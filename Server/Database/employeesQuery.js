const database = require("./database");

const getAllUsers = async (_, res) => {
  try {
    const [allUsers] = await database.query("select * from employees");

    res.status(200).send(allUsers);
  } catch (err) {
    res.sendStatus(404);
  }
};

const createEmployee = async (req, res) => {
  try {
    const {
      employeesType_id,
      username,
      firstName,
      lastName,
      city,
      email,
      phone,
      password,
    } = req.body;

    const [allAppointments] = await database.query(
      "insert into employees (employeesType_id, username, firstName,lastName, city, email, phone, password) values(?,?,?,?,?,?,?,?)",
      [
        employeesType_id,
        username,
        firstName,
        lastName,
        city,
        email,
        phone,
        password,
      ]
    );
    if (allAppointments.affectedRows) {
      res.sendStatus(201);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const employeesTimeManagment = async (req, res) => {
  try {
    const [timeManagment] = await database.query(
      `SELECT * FROM haircut.timemanagment`
    );

    console.log(timeManagment);

    timeManagment.length
      ? res.status(200).send(timeManagment)
      : res.status(404).send("no data found !");
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = { getAllUsers, createEmployee, employeesTimeManagment };
