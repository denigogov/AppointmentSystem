const database = require("./database");

const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const [employeesEmail] = await database.query(
      "SELECT email FROM employees WHERE email = ? UNION SELECT email FROM customers WHERE email = ?",
      [email, email]
    );

    if (employeesEmail.length) {
      return res.status(400).send("Duplicate Email");
    }

    const [createCustomer] = await database.query(
      "INSERT INTO customers (firstName, lastName, email, password, phoneNumber) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, password, phoneNumber]
    );

    createCustomer.affectedRows
      ? res.sendStatus(201)
      : res.status(500).send("Failed to create customer");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createCustomer,
};
