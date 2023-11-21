const Joi = require("joi");

const usersSchema = Joi.object({
  firstName: Joi.string().min(3).max(16).required(),
  lastName: Joi.string().max(3).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().min(5).max(15),
});

const validateCustomer = (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  const { error } = usersSchema.validate(
    {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validateCustomer: error.details });
  } else {
    next();
  }
};

module.exports = { validateCustomer };
