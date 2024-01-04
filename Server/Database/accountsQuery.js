const database = require("./database");
const { hashedPassword } = require("../auth");

const editUserAllData = async (req, res) => {
  try {
    const { id, type } = req.params;

    const [employees] = await database.query(
      `SELECT 
      id, 
      employeesUserType_id as userType_id , 
      firstName, 
      lastName, 
      city,
      email ,
      phoneNumber,
      password 
      FROM employees 
      WHERE employees.id = ? AND   employeesUserType_id  = ?`,
      [id, type]
    );

    const [customers] = await database.query(
      `select id, userType_id, firstName, lastName,email,password,phoneNumber,gender  from customers where id = ? and userType_id = ?`,
      [id, type]
    );

    if (employees.length || customers.length) {
      res.status(200).send(employees.length ? employees : customers);
    } else {
      res
        .status(404)
        .send({ error: "No data found for the given parameters." });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const updateUserData = async (req, res) => {
  try {
    const { id, type } = req.params;

    if (type !== 1) {
      const { firstName, lastName, city, email, phoneNumber, password } =
        req.body;

      if (password) {
        await hashedPassword(req, res, async () => {
          const [updateEmployee] = await database.query(
            `UPDATE employees
            SET firstName = ?, lastName = ?, city = ?, email = ?, phoneNumber = ?, password = ?
            WHERE id = ? AND employeesUserType_id = ?
            `,
            [
              firstName,
              lastName,
              city,
              email,
              phoneNumber,
              req.body.password,
              id,
              type,
            ]
          );

          if (updateEmployee.affectedRows) {
            res.sendStatus(200);
          } else {
            const {
              firstName,
              lastName,
              email,
              gender,
              password,
              phoneNumber,
            } = req.body;

            const [updateCustomer] = await database.query(
              `UPDATE customers SET firstName = ?, lastName = ?,  email = ?, gender = ?, password = ?, phoneNumber = ? WHERE id = ? AND userType_id = ?`,
              [
                firstName,
                lastName,
                email,
                gender,
                req.body.password,
                phoneNumber,
                id,
                type,
              ]
            );

            if (updateCustomer.affectedRows) {
              res.sendStatus(200);
            } else {
              res.status(404).send("User not Found, please try again!");
            }
          }
        });
      } else {
        // Password is not provided, update without hashing
        const [updateEmployee] = await database.query(
          `UPDATE employees
          SET firstName = ?, lastName = ?, city = ?, email = ?, phoneNumber = ?
          WHERE id = ? AND employeesUserType_id = ?`,
          [firstName, lastName, city, email, phoneNumber, id, type]
        );

        if (updateEmployee.affectedRows) {
          res.sendStatus(200);
        } else {
          const { firstName, lastName, email, gender, phoneNumber } = req.body;

          const [updateCustomer] = await database.query(
            `UPDATE customers SET firstName = ?, lastName = ?,  email = ?, gender = ?, phoneNumber = ? WHERE id = ? AND userType_id = ?`,
            [firstName, lastName, email, gender, phoneNumber, id, type]
          );

          if (updateCustomer.affectedRows) {
            res.sendStatus(200);
          } else {
            res.status(404).send("User not Found, please try again!");
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = { editUserAllData, updateUserData };
