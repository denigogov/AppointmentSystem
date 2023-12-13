const Joi = require("joi");

const usersSchema = Joi.object({
  firstName: Joi.string().min(3).max(16).required(),
  lastName: Joi.string().max(3).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().min(5).max(15),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(16),
  lastName: Joi.string().max(3).max(16),
  email: Joi.string().email(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$"
      )
    )
    .message(
      "Password should be at least 6 characters and should include at least 1 letter, 1 number, and 1 special character"
    ),
  phoneNumber: Joi.string().min(5).max(15),
  gender: Joi.string().max(7),
  city: Joi.string().min(3).max(20),
});

const validateCustomer = (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  const { error } = usersSchema.validate(
    { firstName, lastName, email, password, phoneNumber },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validateCustomer: error.details });
  } else {
    next();
  }
};

const validateUpdateUser = (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber, street, gender } =
    req.body;

  if (street) {
    const { error } = updateUserSchema.validate(
      { firstName, lastName, email, password, phoneNumber, street },
      { abortEarly: false }
    );

    if (error) {
      res.status(422).json({ validateUpdateUser: error.details });
    } else {
      next();
    }
  } else if (gender) {
    const { error } = updateUserSchema.validate(
      { firstName, lastName, email, password, phoneNumber, gender },
      { abortEarly: false }
    );

    if (error) {
      res.status(422).json({ validateUpdateUser: error.details });
    } else {
      next();
    }
  }
};

module.exports = { validateCustomer, validateUpdateUser };
