const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const newtoken = token.split(" ")[1];
    const decoded = jwt.verify(newtoken, "secret"); 
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const verifyRole1 = (req, res, next) => {
  const { role } = req.user;
  try {
    if (role !== "1") {
      throw new Error("User Role Not Allowed!");
    }
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const verifyRole2 = (req, res, next) => {
  const { role } = req.user;
  try {
    if (role === "3") {
      throw new Error("User Role Not Allowed!");
    }
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = { verifyToken, verifyRole1, verifyRole2 };

// to generate token secret
// require('crypto').randomBytes(64).toString('hex')
