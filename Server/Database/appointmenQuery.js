const database = require("./database");

const getAllServices = async (_, res) => {
  try {
    const [services] = await database.query("select * from services");

    res.status(200).send(services);
  } catch (err) {
    res.sendStatus(404);
  }
};

module.exports = {
  getAllServices,
};
