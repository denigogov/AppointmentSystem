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

module.exports = { totalMoneyAppService };
