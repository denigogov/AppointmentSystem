const database = require("./database");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.APIEMAILKEY);

const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const payload = {
      email: email,
      username: firstName,
      type: 1,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "90000", //60 secound!
    });
    const confirmationLink = `http://localhost:4000/tableRoute/confirm?token=${token}`;

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

    if (createCustomer.affectedRows) {
      // Sending the message when user create account
      const message = {
        to: email,
        from: process.env.EMAIL,
        subject: `Hello ${firstName}`,
        html: `
        <h5>${firstName} Click the following link to confirm your email address:</h5>
        <a href="${confirmationLink}">confirmation link</a>
      `,
      };
      sgMail
        .send(message)
        .then(() => {
          res.status(200).send("Email confirmation sent successfully.");
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("Error sending confirmation email.");
        });
    } else {
      res.status(500).send("Failed to create customer");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createCustomer,
};
