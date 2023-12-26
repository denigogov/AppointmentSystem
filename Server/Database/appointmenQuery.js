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

const getServiceStatisticProcent = async (req, res) => {
  try {
    const { id } = req.params;

    const [serviceStatistic] = await database.query(
      `
    SELECT
    servicesName,
    currentMonthAppointments,
    previousMonthAppointments,
    ((currentMonthAppointments - previousMonthAppointments) / previousMonthAppointments) * 100 as percentageDifference
    FROM (
    SELECT
        servicesName,
        COUNT(CASE WHEN MONTH(scheduled_at) = MONTH(CURRENT_DATE()) AND YEAR(scheduled_at) = YEAR(CURRENT_DATE()) THEN employee_id END) as currentMonthAppointments,
        COUNT(CASE WHEN MONTH(scheduled_at) = MONTH(CURRENT_DATE()) - 1 AND YEAR(scheduled_at) = YEAR(CURRENT_DATE()) THEN employee_id END) as previousMonthAppointments
    FROM appointments
    LEFT JOIN services ON appointments.service_id = services.id
    WHERE
        (MONTH(scheduled_at) = MONTH(CURRENT_DATE()) OR MONTH(scheduled_at) = MONTH(CURRENT_DATE()) - 1)
        AND YEAR(scheduled_at) = YEAR(CURRENT_DATE())   ${
          id ? "AND employee_id = ?" : ""
        } 
    GROUP BY servicesName) AS subquery
      `,
      id ? [id] : [] // making the params optional !
    );

    serviceStatistic.length
      ? res.status(200).send(serviceStatistic)
      : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getAppointmentByHourRange = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const [allAppointmentByHour] = await database.query(
      `
SELECT
    all_hours.hour_of_day,
    COUNT(appointments.id) AS total_appointments
FROM
    (
        SELECT 0 AS hour_of_day
        UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
        UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8
        UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
        UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16
        UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
        UNION SELECT 21 UNION SELECT 22 UNION SELECT 23
    ) AS all_hours
LEFT JOIN
    appointments ON HOUR(appointments.scheduled_at) = all_hours.hour_of_day
    ${
      startDate
        ? `AND appointments.created_at BETWEEN ? AND ?`
        : `AND MONTH(appointments.created_at) = MONTH(CURDATE())
    AND YEAR(appointments.created_at) = YEAR(CURDATE())`
    }

    ${id ? "AND appointments.employee_id = ?" : ""} 

GROUP BY
    all_hours.hour_of_day
ORDER BY
    all_hours.hour_of_day;
  `,
      [startDate, endDate, id]
    );

    allAppointmentByHour.length
      ? res.status(200).send(allAppointmentByHour)
      : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

//
module.exports = {
  getAllServices,
  getServiceEmployeesJoin,
  getAllAppointments,
  postAppointment,
  deleteAppointment,
  getAllAppointmentByDataRange,
  getServiceStatisticProcent,
  getAppointmentByHourRange,
};
