const database = require("./database");

const customerAllData = async (req, res) => {
  try {
    const { id, type } = req.params;

    const [findCustomer] = await database.query(
      `SELECT 
      appointments.scheduled_at, 
      appointments.created_at, 
      employees.lastName as EmployeeLastName, 
      employees.firstName as EmployeeFirstName, 
      services.servicesName, 
      services.servicePrice, 
      customers.firstName as CustomerFirstName, 
      customers.lastName as CustomerLastName, 
      customers.email as customerEmail, 
      customers.phoneNumber as customerPhone, 
      customers.created_at as customerRegistration 
  FROM customers
  LEFT JOIN appointments ON customers.id = appointments.customer_id
  LEFT JOIN employees ON appointments.employee_id = employees.id
  LEFT JOIN services ON appointments.service_id = services.id
  WHERE customers.id = ? AND userType_id = ?`,
      [id, type]
    );

    findCustomer.length
      ? res.status(200).send(findCustomer)
      : res.status(400).send("user not found ");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  customerAllData,
};
