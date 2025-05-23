const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Nincs token – Bejelentkezés szükséges" });
  }

  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: "Érvénytelen token" });
  }
};

const verifyAdmin = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Csak admin jogosultsággal elérhető" });
    }
    next();
  });
};

const verifyAuditerOrAdmin = (req, res, next) => {
  authenticateToken(req, res, () => {
    const role = req.user.role;
    if (role !== 'admin' && role !== 'auditer') {
      return res.status(403).json({ error: 'Csak auditerek vagy adminok használhatják' });
    }
    next();
  });
};

module.exports = {
  authenticateToken,
  verifyAdmin,
  verifyAuditerOrAdmin
};
