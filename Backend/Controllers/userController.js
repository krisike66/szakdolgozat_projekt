// userController.js

const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

// Az adatbázisból származó user modell
const User = db.users;

// Felhasználó regisztráció (signup)
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      userName,
      email,
      password: hashedPassword,
    };

    // Felhasználó mentése az adatbázisba
    const user = await User.create(data);

    if (user) {
      // Token generálása a user id alapján (1 napos lejárattal)
      const token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: "1d",
      });

      // Cookie beállítása a tokennel (maxAge: 1 nap)
      res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

      // Tisztítjuk a visszaküldendő adatokat (pl. a jelszó törlése)
      const userData = user.toJSON();
      delete userData.password;

      return res.status(201).json(userData);
    } else {
      return res.status(409).json({ error: "User creation failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Felhasználó bejelentkezés (login)
// userController.js
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email
        } 
      });
  
      if (user) {
        // Itt használd a helyes mezőt:
        const isSame = await bcrypt.compare(password, user.password_hash);
  
        if (isSame) {
          // JWT generálás és egyéb logika...
          return res.status(201).send(user);
        } else {
          return res.status(401).send("Authentication failed");
        }
      } else {
        return res.status(401).send("Authentication failed");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal server error" });
    }
  };
  
  
  module.exports = { signup, login };