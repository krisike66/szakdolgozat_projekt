// controllers/tudasanyagController.js
const jwt = require('jsonwebtoken');
const db = require('../Models');
const Tudasanyag = db.tudasanyag;
const User = db.users;
const Cimke = db.cimke;

// Összes tudásanyag lekérése szerzővel és módosítóval
const getAllTudasanyagok = async (req, res) => {
  try {
    const tudasanyagok = await Tudasanyag.findAll({
      include: [
        { model: User, as: 'szerzo', attributes: ['felhasznalonev'] },
        { model: User, as: 'modosito', attributes: ['felhasznalonev'] },
        { model: Cimke, as: 'cimkek', attributes: ['cimke_id', 'nev'] }
      ]
    });
    res.status(200).json(tudasanyagok);
  } catch (error) {
    console.error('Hiba a tudásanyagok lekérésekor:', error);
    res.status(500).json({ error: 'Belső szerver hiba' });
  }
};

// Egy konkrét tudásanyag lekérése ID alapján szerzővel és módosítóval
const getTudasanyagById = async (req, res) => {
  try {
    const id = req.params.id;
    const tudasanyag = await Tudasanyag.findByPk(id, {
      include: [
        { model: User, as: 'szerzo', attributes: ['felhasznalonev'] },
        { model: User, as: 'modosito', attributes: ['felhasznalonev'] },
        { model: Cimke, as: 'cimkek', attributes: ['cimke_id', 'nev'] }
      ]
    });
    if (!tudasanyag) {
      return res.status(404).json({ error: 'A kért tudásanyag nem található.' });
    }
    res.status(200).json(tudasanyag);
  } catch (error) {
    console.error('Hiba egy tudásanyag lekérésekor:', error);
    res.status(500).json({ error: 'Belső szerver hiba' });
  }
};

// Új tudásanyag létrehozása
const createTudasanyag = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Autentikáció szükséges' });
    }

    const decoded = jwt.verify(token, process.env.secretKey);
    const userId = decoded.user_id;  // A tokenből kinyert user_id

    const { cim, tartalom, kategoria_id, cimkek } = req.body;

    // Tudásanyag létrehozása
    const newTudasanyag = await Tudasanyag.create({
      cim,
      tartalom,
      kategoria_id,
      letrehozva: new Date(),
      modositva: new Date(),
      letrehozva_altala: userId,
      modositva_altala: userId
    });

    console.log("Decoded token:", decoded);

    // Címkék hozzáadása
    if (cimkek && cimkek.length > 0) {
      const cimkeObjektek = await Cimke.findAll({
        where: {
          cimke_id: cimkek
        }
      });
      await newTudasanyag.addCimkek(cimkeObjektek);
    }

    res.status(201).json(newTudasanyag);
  } catch (error) {
    console.error("Hiba a tudásanyag létrehozásakor:", error);
    res.status(500).json({ error: "Belső szerver hiba" });
  }
};

module.exports = { createTudasanyag };


module.exports = {
  getAllTudasanyagok,
  getTudasanyagById,
  createTudasanyag
};
