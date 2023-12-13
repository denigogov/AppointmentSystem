const database = require("./database");

const getAllServices = async (_, res) => {
  try {
    const [services] = await database.query("select * from services");

    if (services.length) {
      res.status(200).send(services);
    } else throw new Error();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getServiceEmployeesJoin = async (_, res) => {
  try {
    const [servicesEmployees] =
      await database.query(`SELECT services_id, employees_id, firstName, lastName FROM haircut.serviceemployee join employees on serviceemployee.employees_id = employees.id
    `);

    return res.status(200).send(servicesEmployees || []);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAllAppointments = async (_, res) => {
  try {
    const [appointmnets] = await database.query(`SELECT * from appointments`);

    appointmnets
      ? res.status(200).send(appointmnets)
      : new Error("no appointments");
  } catch (err) {
    console.error(err);
  }
};

const postAppointment = async (req, res) => {
  try {
    const { customer_id, employee_id, service_id, scheduled_at } = req.body;

    const [createAppointment] = await database.query(
      `Insert into appointments (customer_id, employee_id, service_id,scheduled_at) values(?,?,?,?)`,
      [customer_id, employee_id, service_id, scheduled_at]
    );

    if (createAppointment.affectedRows) {
      res.sendStatus(201);
    } else throw new Error();
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const id = req.params.id;

    const [deleteQuery] = await database.query(
      "DELETE FROM appointments WHERE id = ?",
      [id]
    );

    deleteQuery.affectedRows ? res.sendStatus(200) : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getAllServices,
  getServiceEmployeesJoin,
  getAllAppointments,
  postAppointment,
  deleteAppointment,
};
