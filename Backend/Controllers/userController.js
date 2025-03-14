const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

// Adatbázisból a felhasználó modell
const User = db.users;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const isSame = await bcrypt.compare(password, user.password_hash);
      if (isSame) {
        // Új token generálása a bejelentkezett felhasználóhoz
        const token = jwt.sign({ id: user.user_id }, process.env.secretKey, {
          expiresIn: "1d",
        });
        // Frissítjük a sütit, így mindig az aktuális felhasználó tokenje lesz benne
        res.cookie("jwt", token, {
          httpOnly: true,
          sameSite: "lax", // vagy 'strict', az igények szerint
          // domain és path is beállítható, ha szükséges
        });
        return res.status(201).send(user);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

const profile = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.secretKey);
    const user = await User.findByPk(decoded.id);
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { login, profile };
