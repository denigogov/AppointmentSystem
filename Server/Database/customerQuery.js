const database = require("./database");

const customerAllData = async (req, res) => {
  try {
    const { id, type } = req.params;

    const query = `SELECT 
      appointments.scheduled_at, 
      appointments.created_at, 
      employees.lastName as EmployeeLastName, 
      employees.firstName as EmployeeFirstName, 
      employees.id as employeeId,
      appointments.id as appointmentId,
      services.servicesName, 
      services.servicePrice, 
      customers.firstName as CustomerFirstName, 
      customers.lastName as CustomerLastName, 
      customers.email as customerEmail, 
      customers.phoneNumber as customerPhone, 
      customers.created_at as customerRegistration,
      customers.gender 
    FROM customers
    LEFT JOIN appointments ON customers.id = appointments.customer_id
    LEFT JOIN employees ON appointments.employee_id = employees.id
    LEFT JOIN services ON appointments.service_id = services.id
    ${id && type ? "WHERE customers.id = ? AND userType_id = ?" : ""}`;

    const params = id && type ? [id, type] : [];

    const [findCustomer] = await database.query(query, params);

    findCustomer.length
      ? res.status(200).send(findCustomer)
      : res.status(400).send("user not found ");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const top5Customers = async (_, res) => {
  try {
    const [findCustomers] = await database.query(`
SELECT count(appointments.id) as totalAppointments, appointments.customer_id, 
concat(customers.firstName, ' ' ,customers.lastName ) as customerName
from appointments 
left join customers on appointments.customer_id = customers.id
group by customer_id  
ORDER BY totalAppointments DESC
limit 5
`);
    findCustomers ? res.status(200).send(findCustomers) : res.status(400);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const allCustomersPagination = async (req, res) => {
  const { page, limit } = req.query;

  const offset = (page - 1) * limit;

  try {
    const [limitResults] = await database.query(
      `SELECT 
      id,  firstName, lastName, email,  phoneNumber, confirmation, gender, created_at from customers

    
    limit ? offset ?`,
      [+limit, +offset]
    );

    // const [totalPageData] = await database.query(
    //   `select count(*) as count from appointments`
    // );

    // console.log("totalSIze", +totalPageData[0]?.count);

    // const totalPages = Math.ceil(+totalPageData[0]?.count / limit);

    // const paginationData = {
    //   data: limitResults,
    //   pagination: {
    //     page: +page,
    //     limit: +limit,
    //     totalPages,
    //   },
    // };

    limitResults ? res.status(200).send(limitResults) : res.sendstatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send("Invalid ID");
    }

    const [customer] = await database.query(
      "DELETE FROM customers WHERE id = ? ",
      [id]
    );

    customer.affectedRows ? res.sendStatus(202) : res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  customerAllData,
  top5Customers,
  allCustomersPagination,
  deleteCustomer,
};
