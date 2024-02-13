const database = require("./database");

// I don't use anywere but I will use in OWNER DASHBOARD
const getAllEmployees = async (_, res) => {
  try {
    const [allUsers] = await database.query(
      `SELECT id, employeesUserType_id, username, firstName, lastName, city, email, phoneNumber FROM employees where employeesUserType_id = 2 `
    );

    allUsers.length ? res.status(200).send(allUsers) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(404);
  }
};

// I don't use anywere but I will use in OWNER DASHBOARD only owner to be able to create employees user

// I need also to add working time because app will be broken or I can add by default !
const createEmployee = async (req, res) => {
  try {
    const {
      employeesUserType_id,
      username,
      firstName,
      lastName,
      city,
      email,
      phoneNumber,
      password,
    } = req.body;

    const [allAppointments] = await database.query(
      "insert into employees (employeesUserType_id, username, firstName,lastName, city, email, phoneNumber, password) values(?,?,?,?,?,?,?,?)",
      [
        employeesUserType_id,
        username,
        firstName,
        lastName,
        city,
        email,
        phoneNumber,
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
    const { id } = req.params;
    const [timeManagment] = await database.query(
      `SELECT * FROM haircut.timemanagment ${
        id ? "where employee_id = ?" : ""
      }`,
      [id]
    );

    timeManagment.length
      ? res.status(200).send(timeManagment)
      : res.status(404).send("no data found !");
  } catch (err) {
    res.sendStatus(500);
  }
};

const UpdateTimeManagement = async (req, res) => {
  const { id } = req.params;

  const {
    startDate,
    endDate,
    startHour,
    endHour,
    startMinute,
    endMinute,
    timeInterval,
  } = req.body;

  const updateFields = [];
  const updateValues = [];

  if (startDate !== undefined) {
    updateFields.push("startDate = ?");
    updateValues.push(startDate);
  }

  if (endDate !== undefined) {
    updateFields.push("endDate = ?");
    updateValues.push(endDate);
  }

  if (startHour !== undefined) {
    updateFields.push("startHour = ?");
    updateValues.push(startHour);
  }

  if (endHour !== undefined) {
    updateFields.push("endHour = ?");
    updateValues.push(endHour);
  }

  if (startMinute !== undefined) {
    updateFields.push("startMinute = ?");
    updateValues.push(startMinute);
  }

  if (endMinute !== undefined) {
    updateFields.push("endMinute = ?");
    updateValues.push(endMinute);
  }

  if (timeInterval !== undefined) {
    updateFields.push("timeInterval = ?");
    updateValues.push(timeInterval);
  }

  const updateQuery = `UPDATE timemanagment SET ${updateFields.join(
    ", "
  )} WHERE employee_id = ?`;

  try {
    const [updateTable] = await database.query(updateQuery, [
      ...updateValues,
      id,
    ]);

    updateTable.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    console.log(err);

    req.sendStatus(500);
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  employeesTimeManagment,
  UpdateTimeManagement,
};
