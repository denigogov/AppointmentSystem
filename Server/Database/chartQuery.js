const database = require("./database");

const totalMoneyAppService = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const dataOptional = startDate
      ? "WHERE scheduled_at BETWEEN ? AND ?"
      : "WHERE MONTH(scheduled_at) = MONTH(CURDATE()) AND YEAR(scheduled_at) = YEAR(CURDATE())";

    const [dataForOwnerDash] = await database.query(
      `
        SELECT SUM(servicePrice) AS totalMoney,
count(appointments.id) as totalAppointments,

 (SELECT services.servicesName
     FROM appointments
     JOIN services ON appointments.service_id = services.id
  ${dataOptional}

     GROUP BY services.servicesName
     ORDER BY COUNT(*) DESC
     LIMIT 1
    ) as topService

FROM appointments
JOIN services ON appointments.service_id = services.id
   ${dataOptional}
        `,
      startDate ? [startDate, endDate, startDate, endDate] : []
    );

    dataForOwnerDash
      ? res.status(200).send(dataForOwnerDash)
      : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

// FOR 8.0 VERSION MYSQL
// const dataByService = async (_, res) => {
//   try {
//     const [findDataByService] = await database.query(
//       `
//       SELECT
//   servicesData.servicesName,
//   servicesData.totalAppointments,
//   servicesData.totalMoney,
//   bestEmployeeData.bestEmployer
// FROM (
//   SELECT
//     servicesName,
//     COUNT(*) AS totalAppointments,
//     SUM(servicePrice) AS totalMoney
//   FROM
//     appointments
//   LEFT JOIN
//     services ON services.id = appointments.service_id
//   LEFT JOIN
//     employees ON employees.id = appointments.employee_id
//   GROUP BY
//     servicesName
// ) servicesData
// LEFT JOIN (
//   SELECT
//     servicesName,
//     employees.firstName AS bestEmployer,
//     RANK() OVER (PARTITION BY servicesName ORDER BY COUNT(*) DESC) AS rankAlias
//   FROM
//     appointments
//   LEFT JOIN
//     services ON services.id = appointments.service_id
//   LEFT JOIN
//     employees ON employees.id = appointments.employee_id
//   GROUP BY
//     servicesName, bestEmployer
// ) bestEmployeeData ON servicesData.servicesName = bestEmployeeData.servicesName AND bestEmployeeData.rankAlias = 1;
//       `
//     );

//     findDataByService.length
//       ? res.status(200).send(findDataByService)
//       : res.sendStatus(404);
//   } catch (err) {
//     res.sendStatus(500);
//   }
// };

// FOR 5.5  MYSQL VERSION because of the free db service!
const dataByService = async (_, res) => {
  try {
    const [findDataByService] = await database.query(
      `
      SELECT
  servicesData.servicesName,
  servicesData.totalAppointments,
  servicesData.totalMoney,
  bestEmployeeData.bestEmployer
FROM (
  SELECT
    services.servicesName,
    COUNT(*) AS totalAppointments,
    SUM(services.servicePrice) AS totalMoney
  FROM
    appointments
  LEFT JOIN
    services ON services.id = appointments.service_id
  LEFT JOIN
    employees ON employees.id = appointments.employee_id
  GROUP BY
    services.servicesName
) servicesData
LEFT JOIN (
  SELECT
    services.servicesName,
    employees.firstName AS bestEmployer
  FROM
    appointments
  LEFT JOIN
    services ON services.id = appointments.service_id
  LEFT JOIN
    employees ON employees.id = appointments.employee_id
  GROUP BY
    services.servicesName, employees.firstName
  HAVING
    COUNT(*) = (
      SELECT
        COUNT(*)
      FROM
        appointments AS a
      LEFT JOIN
        services AS s ON s.id = a.service_id
      LEFT JOIN
        employees AS e ON e.id = a.employee_id
      WHERE
        s.servicesName = services.servicesName
      GROUP BY
        e.firstName
      ORDER BY
        COUNT(*) DESC
      LIMIT 1
    )
) bestEmployeeData ON servicesData.servicesName = bestEmployeeData.servicesName;
      `
    );

    findDataByService.length
      ? res.status(200).send(findDataByService)
      : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
};

const serviceByMonth = async (req, res) => {
  try {
    const { services } = req.query;

    const [fetchByMonthMoney] = await database.query(
      `
  SELECT
  YEAR(scheduled_at) AS year,
  MONTHNAME(scheduled_at) AS month,
  SUM(servicePrice) AS totalMoney
FROM
  appointments

JOIN
  services ON services.id = appointments.service_id
${services ? ` where services.servicesName = ?` : ""}   
GROUP BY
  YEAR(scheduled_at),
  MONTH(scheduled_at),
  MONTHNAME(scheduled_at)
ORDER BY
  year ASC,
  MONTH(scheduled_at) ASC
  `,
      [services ? services : []]
    );

    fetchByMonthMoney.length
      ? res.status(200).send(fetchByMonthMoney)
      : req.sendStatus(400);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

module.exports = { totalMoneyAppService, dataByService, serviceByMonth };
