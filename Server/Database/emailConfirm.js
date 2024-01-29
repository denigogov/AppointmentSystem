const database = require("./database");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const accessCode = process.env.JWT_SECRET;

sgMail.setApiKey(process.env.APIEMAILKEY);

const createCustomer = async (req, res) => {
  try {
    const { gender, firstName, lastName, email, password, phoneNumber } =
      req.body;

    const payload = {
      email: email,
    };

    const token = jwt.sign(payload, accessCode, {
      expiresIn: "900s", // 15 minutes!
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
      "INSERT INTO customers (gender,firstName, lastName, email, password, phoneNumber) VALUES (?, ?,?, ?, ?, ?)",
      [gender, firstName, lastName, email, password, phoneNumber]
    );

    if (createCustomer.affectedRows) {
      // Sending the message when user create account
      const message = {
        //   to: email,
        //   from: process.env.EMAIL,
        //   subject: `Hello ${firstName}`,
        //   html: `
        //   <h5>${firstName}, welcome to our platform!</h5>
        //   <p>We're excited to have you as a member of our community. To get started, click the following link to confirm your email address:</p>
        //   <a href="${confirmationLink}">confirmation link</a>

        //   <p><strong>Your Link expires after 15 minutes!</strong></p>

        //   <p>Thank you for choosing our Scheduler Suite System. If you have any questions or need assistance, feel free to contact our support team.</p>

        //   <p>Best regards,<br>Dejan</p>
        // `,

        from: {
          email: process.env.EMAIL,
        },

        personalizations: [
          {
            to: [
              {
                email: `${email}`,
              },
            ],
            subject: `Please confirm your SalonPro Email account`,
            dynamic_template_data: {
              link: `${confirmationLink}`,
              name: `${firstName}`,
            },
          },
        ],
        template_id: "d-74486dd077084ef9ba4005af78ff8f7c",
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

const customerConfirm = async (req, res) => {
  try {
    const tokenFromUrl = req.query.token;
    const decoded = jwt.verify(tokenFromUrl, accessCode);
    const [findCustomerEmail] = await database.query(
      "select email, confirmation,id, userType_id from customers where email = ?  AND confirmation = false",
      [decoded.email]
    );

    // const { email, confirmation, id, userType_id } = findCustomerEmail[0];

    if (
      findCustomerEmail[0]?.email.length > 0 &&
      findCustomerEmail[0]?.confirmation !== true
    ) {
      const [confirmCustomerEmail] = await database.query(
        `UPDATE customers SET confirmation = true`
      );

      if (confirmCustomerEmail.affectedRows) {
        const refreshToken = jwt.sign(
          // I'm add sub and type because the confirm Ip accept only this 2 values!
          {
            sub: findCustomerEmail[0]?.id,
            type: findCustomerEmail[0]?.userType_id,
          },
          accessCode,
          {
            expiresIn: "12h",
          }
        );

        res.status(200).send(`
      <html>
      <head>
        <meta http-equiv="refresh" content="3;url=http://localhost:3000/home/confirm?${refreshToken}">
      </head>
      <body>
        <h1>Email confirmation successful !</h1>
        <p>Thank you for confirming your email address. You will be redirected to the main page in 3 seconds. If not, <a href="http://localhost:3000/app">click here</a>.</p>
      </body>
    </html>
    
    `);
      } else {
        res.status(500).send("user not exsist");
      }
    } else {
      res.status(500).send(`
      <html>
        <head>
          <meta http-equiv="refresh" content="3;url=http://localhost:3000/">
        </head>
        <body>
          <h1>Email is Already Confirmed ! </h1>
          <p>You will be redirected to the main page in 3 seconds. If not, <a href="http://localhost:3000/">click here</a>.</p>
        </body>
      </html>
    `);
    }
  } catch (err) {
    res.status(400).send("LINK HAS EXPIRE!");
  }
};

module.exports = {
  createCustomer,
  customerConfirm,
};
