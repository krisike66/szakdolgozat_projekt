
const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    if (decoded.role !== "admin") {
      return res.status(403).send({ error: "Forbidden: Admins only" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = verifyAdmin;
