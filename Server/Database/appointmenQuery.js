const database = require("./database");
const moment = require("moment");

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

// More info check serviceemployee Table !
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

// Fetching all appointmnet by date  and EmployeesID, default date =  TODAY! ,
const getAllAppointmentByDataRange = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    // console.log("normalStart", startDate);
    // const currentDate = moment().format("YYYY-MM-DD");

    // const defaultStartDate = startDate ? startDate : currentDate;
    // const defaultEndDate = endDate ? endDate : currentDate;

    const [appointmentRange] = await database.query(
      `
    SELECT appointments.id as appointmentId, appointments.employee_id,customers.firstName, customers.lastName, customers.id as customerID, services.servicesName, services.id as serviceID,  appointments.scheduled_at  FROM haircut.appointments 
    left join services on appointments.service_id = services.id
    left join customers on appointments.customer_id = customers.id
    WHERE  DATE(scheduled_at)  between  ?  and  ? AND employee_id = ?
    ORDER BY appointments.scheduled_at
    `,
      [startDate, endDate, id]
    );

    // converting the appointment to currentTimezone with moment because for some reason mysql2 convert the date to UTC!
    const formattedAppointments = appointmentRange.map((appointment) => ({
      ...appointment,
      scheduled_at: moment(appointment.scheduled_at).format(),
    }));

    res.status(200).send(formattedAppointments);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAllServices,
  getServiceEmployeesJoin,
  getAllAppointments,
  postAppointment,
  deleteAppointment,
  getAllAppointmentByDataRange,
};
