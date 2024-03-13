const database = require("./database");
const { hashedPassword } = require("../auth");

const getAllEmployees = async (req, res) => {
  try {
    const [allUsers] = await database.query(
      `SELECT employees.id, userType_name, username, firstName, lastName, city, email, phoneNumber FROM employees 
      left join usertypes on employees.employeesUserType_id = usertypes.id`
    );

    allUsers.length ? res.status(200).send(allUsers) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(404);
  }
};

const getSingleEmployer = async (req, res) => {
  const { id } = req.params;

  try {
    const [allUsers] = await database.query(
      `SELECT employees.id, userType_name, username, firstName, lastName, city, email, phoneNumber FROM employees 
      left join usertypes on employees.employeesUserType_id = usertypes.id
     ${id ? "where employees.id = ?" : ""}`,
      [id]
    );

    allUsers.length ? res.status(200).send(allUsers) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(404);
  }
};

const createEmployee = async (req, res) => {
  try {
    const {
      employeesUserType_id,
      firstName,
      lastName,
      city,
      email,
      phoneNumber,
      password,
    } = req.body;

    const [createEmployerQuery] = await database.query(
      "insert into employees (employeesUserType_id,  firstName,lastName, city, email, phoneNumber, password) values(?,?,?,?,?,?,?)",
      [
        employeesUserType_id,
        firstName,
        lastName,
        city,
        email,
        phoneNumber,
        password,
      ]
    );
    createEmployerQuery.affectedRows
      ? res.sendStatus(201)
      : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateEmployer = async (req, res) => {
  try {
    const { id } = req.params;

    const { firstName, lastName, city, email, phoneNumber, password } =
      req.body;

    const updateFields = [];
    const updateValues = [];

    if (firstName !== undefined) {
      updateFields.push("firstName = ?");
      updateValues.push(firstName);
    }
    if (lastName !== undefined) {
      updateFields.push("lastName = ?");
      updateValues.push(lastName);
    }
    if (city !== undefined) {
      updateFields.push("city = ?");
      updateValues.push(city);
    }
    if (email !== undefined) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }
    if (phoneNumber !== undefined) {
      updateFields.push("phoneNumber = ?");
      updateValues.push(phoneNumber);
    }

    if (password !== undefined) {
      updateFields.push("password = ?");
      updateValues.push(password);
    }

    const updateEmployer = `UPDATE employees SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;

    const [updateTable] = await database.query(updateEmployer, [
      ...updateValues,
      id,
    ]);

    updateTable.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const employeesTimeManagment = async (req, res) => {
  try {
    const { id } = req.params;
    const [timeManagment] = await database.query(
      `SELECT * FROM timemanagment ${id ? "where employee_id = ?" : ""}`,
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

const deleteEmployer = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send("Invalid ID");
    }

    const [findEmployerAndDelete] = await database.query(
      `DELETE FROM employees WHERE id = ? `,
      [id]
    );

    findEmployerAndDelete.affectedRows
      ? res.sendStatus(202)
      : res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const userTypesTable = async (_, res) => {
  try {
    const [usersTypes] = await database.query("SELECT * FROM usertypes");

    usersTypes.length ? res.status(200).send(usersTypes) : res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createEmployerWorkTime = async (req, res) => {
  try {
    const { startHour, endHour, startMinute, endMinute, employee_id } =
      req.body;

    const [createWorkTime] = await database.query(
      "INSERT INTO  timemanagment  ( startHour, endHour, startMinute, endMinute, employee_id ) values(?,?,?,?,?)",
      [startHour, endHour, startMinute, endMinute, employee_id]
    );

    createWorkTime.affectedRows ? res.sendStatus(201) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  employeesTimeManagment,
  UpdateTimeManagement,
  deleteEmployer,
  userTypesTable,
  createEmployerWorkTime,
  getSingleEmployer,
  updateEmployer,
};
