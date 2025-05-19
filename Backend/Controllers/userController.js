const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

// Adatbázisból a felhasználó modell
const User = db.users;
const Tudasanyag = db.tudasanyag;
const Komment = db.komment;
const Ertekeles = db.ertekeles;


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const isSame = await bcrypt.compare(password, user.password_hash);
      if (isSame) {
        // Token generálása a felhasználó ID és role alapján
        const token = jwt.sign(
          { user_id: user.user_id, role: user.role },
          process.env.secretKey,
          { expiresIn: "1d" }
        );

        res.cookie("jwt", token, {
          httpOnly: true,
          sameSite: "lax",
        });

        // Válaszként küldjük a token-t és a user adatokat
        return res.status(201).json({ token, user });
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
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Autentikáció szükséges" });
    }

    const decoded = jwt.verify(token, process.env.secretKey);
    console.log("Decoded token:", decoded);  // Ellenőrizd, mit tartalmaz a token

    const user = await User.findByPk(decoded.user_id, {
      attributes: ["user_id", "felhasznalonev", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({ error: "Felhasználó nem található" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Profil betöltési hiba:", error);
    res.status(500).json({ error: "Belső szerver hiba" });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    if (!userName || !email || !password || !role) {
      return res.status(400).send({ error: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      felhasznalonev: userName,
      email,
      password_hash: hashedPassword,
      role
    });
    res.status(201).send(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};


// Összes felhasználó lekérése
const getUsers = async (req, res) => {
  try {
    // Ha a ?sort=desc kerül megadásra, csökkenő rendezünk, egyébként növekvő
    const sortOrder = req.query.sort === 'desc' ? 'DESC' : 'ASC';
    const users = await User.findAll({
      order: [['user_id', sortOrder]]
    });
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

// Felhasználó törlése
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await User.destroy({ where: { user_id: userId } });
    if (result) {
      return res.status(200).send({ message: "Felhasználó törölve" });
    } else {
      return res.status(404).send({ error: "Nem található felhasználó" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// (Opcionális) Felhasználó módosítása
const updateUser = async (req, res) => {
  try {
    const { userName, email, role } = req.body;
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    // Frissítjük az adatokat
    user.felhasznalonev = userName;
    user.email = email;
    user.role = role;
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};


const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).send({ error: "Az ID nem szám." });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};



const getUserStats = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token szükséges' });

    const decoded = jwt.verify(token, process.env.secretKey);
    const user_id = decoded.user_id;

    const [letrehozott, modositott, kommentek, ertekelesek, atlagErtekeles] = await Promise.all([
      Tudasanyag.count({ where: { letrehozva_altala: user_id } }),
      Tudasanyag.count({ where: { modositva_altala: user_id } }),
      Komment.count({ where: { user_id } }),
      Ertekeles.count({ where: { user_id } }),
      Ertekeles.findOne({
        where: { user_id },
        attributes: [[db.Sequelize.fn('AVG', db.Sequelize.col('ertekeles')), 'atlag']]
      })
    ]);

    res.json({
      letrehozott,
      modositott,
      kommentek,
      ertekelesek,
      atlagErtekeles: parseFloat(atlagErtekeles?.dataValues?.atlag || 0).toFixed(2)
    });
  } catch (err) {
    console.error("Statisztika lekérés hiba:", err);
    res.status(500).json({ error: 'Belső szerver hiba' });
  }
};

module.exports = { login, profile, createUser, getUsers, updateUser, deleteUser, getUserById, getUserStats };
