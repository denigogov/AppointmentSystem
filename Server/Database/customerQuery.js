const database = require("./database");

const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const [createCustomer] = await database.query(
      "INSERT INTO customers( firstName, lastName, email, password, phoneNumber) VALUES (?, ?, ? ,?, ?)",
      [firstName, lastName, email, password, phoneNumber]
    );
    if (createCustomer.affectedRows) {
      res.sendStatus(201);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createCustomer,
};
