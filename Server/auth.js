require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashOption = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashedPassword = async (req, res, next) => {
  try {
    const hashpass = await argon2.hash(req.body.password, hashOption);

    req.body.password = hashpass;

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const verifyPassword = async (req, res) => {
  try {
    const verifyPass = await argon2.verify(
      req.user.password,
      req.body.password
    );

    if (verifyPass) {
      const payload = {
        sub: req.user.id,
        type: req.user.userType_id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });
      res.send({ token });
    } else {
      res.status(401).send("wrong password");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};

const veryfyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader)
      throw new Error("Authorization header is missing");
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      res.status(401).json({ success: false, payload: "Invalid token" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          throw new Error("Invalid token");
        }

        req.decodedToken = decodedToken;

        next();
      });
    }
  } catch (err) {
    res.sendStatus(401);
  }
};

const sendUserInfo = (req, res) => {
  res.send({
    success: true,
    payload: req.userInfo,
  });
};
module.exports = { hashedPassword, verifyPassword, veryfyToken, sendUserInfo };
