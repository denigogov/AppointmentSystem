const database = require("./database");
const moment = require("moment");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.APIEMAILKEY);

const getAllServices = async (_, res) => {
  try {
    const [services] = await database.query(`select * from services`);

    if (services.length) {
      res.status(200).send(services);
    } else throw new Error();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const createNewservices = async (req, res) => {
  try {
    const { servicesName, servicePrice } = req.body;

    const [queryCreateService] = await database.query(
      "INSERT INTO services (servicesName, servicePrice) values (?, ?)",
      [servicesName, servicePrice]
    );

    queryCreateService.affectedRows ? res.sendStatus(201) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteServices = async (req, res) => {
  const { id } = req.params;

  const [deleteQuery] = await database.query(
    "Delete from services where id  = ? ",
    [id]
  );

  deleteQuery.affectedRows ? res.sendStatus(200) : res.sendStatus(404);
};

// More info check serviceemployee Table !
// Route "tableRoute/serviceemloyees"
const getServiceEmployeesJoin = async (req, res) => {
  try {
    const { id } = req.params;

    const [servicesEmployees] = await database.query(
      `SELECT serviceemployee.id,  services_id, employees_id, firstName, lastName,  serviceemployee.approved,servicesName,servicePrice FROM haircut.serviceemployee 
      left join employees on serviceemployee.employees_id = employees.id
      left join services on serviceemployee.services_id = services.id
      ${id ? "where employees_id = ?" : ""}
    `,
      [id]
    );

    servicesEmployees
      ? res.status(200).send(servicesEmployees)
      : res.sendStatus(404);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const updateServices = async (req, res) => {
  const { id } = req.params;
  const { servicesName, servicePrice } = req.body;

  try {
    const [updateQuery] = await database.query(
      "UPDATE services set servicesName = ?,  servicePrice = ? WHERE id = ? ",
      [servicesName, servicePrice, id]
    );

    updateQuery.affectedRows ? res.sendStatus(200) : res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addNewEmployeesService = async (req, res) => {
  try {
    const serviceEmployeePairs = req.body;

    if (!Array.isArray(serviceEmployeePairs)) {
      return res
        .status(400)
        .send("Invalid request format. Expecting an array.");
    }

    const insertionPromises = serviceEmployeePairs.map(
      async ({ services_id, employees_id, approved }) => {
        const [addService] = await database.query(
          `INSERT INTO serviceemployee (services_id, employees_id,approved) VALUES (?, ?, ?)`,
          [services_id, employees_id, approved || null]
        );

        return addService.affectedRows;
      }
    );

    const results = await Promise.all(insertionPromises);
    const success = results.some((affectedRows) => affectedRows > 0);

    success
      ? res.sendStatus(201)
      : res
          .status(400)
          .send("Invalid input: Please provide a valid parameter.");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteServiceEmployees = async (req, res) => {
  const { id } = req.params;

  try {
    const [deletePendingService] = await database.query(
      `delete from serviceemployee where id = ?`,
      [id]
    );

    deletePendingService.affectedRows
      ? res.sendStatus(200)
      : res.status(400).send("record not found");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAllAppointments = async (_, res) => {
  try {
    //I'm fetching all AllAppointments From Today On..
    const [appointmnets] = await database.query(
      `SELECT * from appointments WHERE scheduled_at > CURRENT_TIMESTAMP`
    );

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

    const [findCustomerEmail] = await database.query(
      `Select email ,firstName from customers where id = ?  `,
      [customer_id]
    );

    const customerEmail = findCustomerEmail[0]?.email ?? "";
    const customerName = findCustomerEmail[0]?.firstName ?? "";

    const message = {
      from: {
        email: process.env.EMAIL,
      },

      personalizations: [
        {
          to: [
            {
              email: `${customerEmail}`,
            },
          ],
          subject: `Appointment Confirmation`,
          dynamic_template_data: {
            hour: `${scheduled_at}`,
            date: `${scheduled_at}`,
            employerName: `${customerName}`,
            customerName: `${customerName}`,
            employeePhone: `${employee_id}`,
          },
        },
      ],
      template_id: "d-705814d4e12c496980238d0777a28ecc",
    };

    sgMail.send(message).then(() => {
      res.status(201).send("Email confirmation sent successfully.");
    });

    if (!createAppointment.affectedRows) throw new Error();
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

// Service
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
        COUNT(CASE WHEN MONTH(scheduled_at) = MONTH(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH)) AND YEAR(scheduled_at) = YEAR(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH)) THEN employee_id END) as previousMonthAppointments
    FROM appointments
    LEFT JOIN services ON appointments.service_id = services.id
    WHERE
        (MONTH(scheduled_at) = MONTH(CURRENT_DATE()) OR (MONTH(scheduled_at) = MONTH(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH)) AND YEAR(scheduled_at) = YEAR(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH))))
        ${id ? "AND employee_id = ?" : ""}
    GROUP BY servicesName
) AS subquery;
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

// id ? [id] : [] // making the params optional !

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

const countAppointmentsByWeekDay = async (req, res) => {
  try {
    const { id } = req.params;
    const [countAppointments] = await database.query(
      `
      SELECT
      DATE_FORMAT(appointments.scheduled_at, '%W') AS weekDay,
      COUNT(CASE WHEN MONTH(appointments.scheduled_at) = MONTH(CURRENT_DATE()) THEN appointments.id END) AS currentMonthOrders,
      COUNT(CASE WHEN YEAR(appointments.scheduled_at) = YEAR(CURRENT_DATE()) THEN appointments.id END) AS totalOrders
    
    FROM appointments
   ${id ? " where employee_id = ?" : ""}
    GROUP BY weekDay
    ORDER BY CASE
      WHEN weekDay = 'Monday' THEN 1
      WHEN weekDay = 'Tuesday' THEN 2
      WHEN weekDay = 'Wednesday' THEN 3
      WHEN weekDay = 'Thursday' THEN 4
      WHEN weekDay = 'Friday' THEN 5
      WHEN weekDay = 'Saturday' THEN 6
      WHEN weekDay = 'Sunday' THEN 7
      ELSE 8  
    END;
      `,
      [id]
    );

    countAppointments.length
      ? res.status(200).send(countAppointments)
      : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  }
};

// Count total appointmnets!
const countTotalAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const [countAppointments] = await database.query(
      `
    SELECT
    COUNT(id) AS totalAppointments,
    COUNT(CASE WHEN MONTH(scheduled_at) = MONTH(CURRENT_DATE()) THEN id END) AS monthlyAppointments,
    COUNT(CASE WHEN YEAR(scheduled_at) = YEAR(CURRENT_DATE()) THEN id END) AS yearlyAppointments
    FROM haircut.appointments
    ${id ? "WHERE employee_id = ?" : ""}
      `,
      [id]
    );

    countAppointments.length
      ? res.status(200).send(countAppointments)
      : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};

//
module.exports = {
  getAllServices,
  getServiceEmployeesJoin,
  addNewEmployeesService,
  getAllAppointments,
  postAppointment,
  deleteAppointment,
  getAllAppointmentByDataRange,
  getServiceStatisticProcent,
  getAppointmentByHourRange,
  countAppointmentsByWeekDay,
  countTotalAppointments,
  deleteServiceEmployees,
  createNewservices,
  deleteServices,
  updateServices,
};
