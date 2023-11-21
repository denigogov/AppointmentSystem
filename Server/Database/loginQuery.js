const database = require("./database");

const findUserLogin = async (req, res, next) => {
  try {
    const { email } = req.body;

    const [findUsername] = await database.query(
      `SELECT employees.id, username, email, password,employeesType_id, userType_id FROM haircut.employees 
      join employeestype on employees.employeesType_id = employeestype.id
      join usertypes on employeestype.userType_id = usertypes.id where email = ?`,
      [email]
    );

    const [findCustomer] = await database.query(
      `select * from customers where email = ?`,
      email
    );

    // ABLE NOW CUSTOMER AND EMPLOYEE TO LOGIN FROM THE SAME FORM !!
    if (
      findUsername?.length > 0 ||
      (findCustomer?.length > 0 && findCustomer[0]?.confirmation !== 0)
    ) {
      req.user = findUsername[0] || findCustomer[0];

      next();
    } else {
      res
        .status(401)
        .send("Unauthorized: Invalid credentials or not confirmed.");
    }
  } catch (err) {
    console.log(err);
    req.status(500).send(`username not valid , ${err.message}`);
  }
};

const getUserIdNext = async (req, res, next) => {
  const { sub = 0, type = 0 } = req.decodedToken || {};
  try {
    if (type === 1) {
      const [findCustomer] = await database.query(
        `select * from customers where id = ? `,
        [sub]
      );

      const user = findCustomer[0] ?? false;

      req.userInfo = {
        id: user.id,
        username: user.username,
        type: user.userType_id,
      };
    } else {
      const [findEmployee] = await database.query(
        `SELECT employees.id, username, email, password,employeesType_id, userType_id FROM haircut.employees 
        join employeestype on employees.employeesType_id = employeestype.id
        join usertypes on employeestype.userType_id = usertypes.id where  employees.id = ?`,
        [sub]
      );

      const user = findEmployee[0] ?? false;

      req.userInfo = {
        id: user.id,
        username: user.username,
        type: user.userType_id,
      };
    }

    next();
  } catch (err) {
    res.status(500).send("error finding user");
  }
};

module.exports = { findUserLogin, getUserIdNext };
