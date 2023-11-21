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
      await database.query(`SELECT services_id, employees_id, username FROM haircut.serviceemployee join employees on serviceemployee.employees_id = employees.id
    `);

    return res.status(200).send(servicesEmployees || []);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllServices,
  getServiceEmployeesJoin,
};
