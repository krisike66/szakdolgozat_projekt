const db = require("../Models");
const Ertesites = db.ertesites;
const jwt = require("jsonwebtoken");

// Egy felhasználó összes értesítése
exports.getErtesitesekByUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token szükséges" });

    const decoded = jwt.verify(token, process.env.secretKey);
    const userId = decoded.user_id;

    const ertesitesek = await Ertesites.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(ertesitesek);
  } catch (err) {
    console.error("Értesítések lekérési hiba:", err);
    res.status(500).json({ error: "Belső szerverhiba" });
  }
};

// Új értesítés létrehozása
exports.createErtesites = async (req, res) => {
  try {
    const { user_id, tipus, uzenet } = req.body;
    const ertesites = await Ertesites.create({
      user_id,
      tipus,
      uzenet,
      olvasott: false
    });

    res.status(201).json(ertesites);
  } catch (err) {
    console.error("Értesítés létrehozási hiba:", err);
    res.status(500).json({ error: "Belső szerverhiba" });
  }
};

// Egy értesítés olvasottá tétele
exports.markAsRead = async (req, res) => {
  try {
    const id = req.params.id;
    const ertesites = await Ertesites.findByPk(id);
    if (!ertesites) return res.status(404).json({ error: "Nem található értesítés" });

    await ertesites.update({ olvasott: true });
    res.json({ message: "Olvasottra állítva" });
  } catch (err) {
    console.error("Olvasottra állítás hiba:", err);
    res.status(500).json({ error: "Belső szerverhiba" });
  }
};

// Összes értesítés olvasottra állítása
exports.markAllAsRead = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token szükséges" });

    const decoded = jwt.verify(token, process.env.secretKey);
    const userId = decoded.user_id;

    await Ertesites.update({ olvasott: true }, { where: { user_id: userId } });

    res.json({ message: "Minden értesítés olvasottra állítva" });
  } catch (err) {
    console.error("Összes olvasottra állítás hiba:", err);
    res.status(500).json({ error: "Belső szerverhiba" });
  }
};
