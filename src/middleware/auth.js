const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/validation");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) throw new Error("Invalid Token");

    const decodedValue = await jwt.verify(token, JWT_SECRET);

    req.id = decodedValue?.id;
    next();
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

module.exports = {
  userAuth,
};
