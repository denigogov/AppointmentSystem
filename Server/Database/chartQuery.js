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
    servicesName,
    COUNT(*) AS totalAppointments,
    SUM(servicePrice) AS totalMoney
  FROM
    appointments
  LEFT JOIN
    services ON services.id = appointments.service_id
  LEFT JOIN
    employees ON employees.id = appointments.employee_id
  GROUP BY
    servicesName
) servicesData
LEFT JOIN (
  SELECT
    servicesName,
    employees.firstName AS bestEmployer,
    RANK() OVER (PARTITION BY servicesName ORDER BY COUNT(*) DESC) AS rankAlias
  FROM
    appointments
  LEFT JOIN
    services ON services.id = appointments.service_id
  LEFT JOIN
    employees ON employees.id = appointments.employee_id
  GROUP BY
    servicesName, bestEmployer
) bestEmployeeData ON servicesData.servicesName = bestEmployeeData.servicesName AND bestEmployeeData.rankAlias = 1;

      `
    );

    findDataByService.length
      ? res.status(200).send(findDataByService)
      : res.sendStatus(400);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
};

module.exports = { totalMoneyAppService, dataByService };
