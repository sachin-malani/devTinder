const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) return res.status(401).json({ message: "Invalid Token" });

    const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);

    req.id = decodedValue?.id;
    next();
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

module.exports = {
  userAuth,
};
