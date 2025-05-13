// controllers/tudasanyagController.js
const jwt = require('jsonwebtoken');
const db = require('../Models');
const Tudasanyag = db.tudasanyag;
const User = db.users;
const Cimke = db.cimke;
const Kategoria = db.kategoria;

// Összes tudásanyag lekérése szerzővel és módosítóval
const getAllTudasanyagok = async (req, res) => {
  try {
    const { kategoria_id, kereses } = req.query;

    const cimke_ids = Array.isArray(req.query.cimke_ids)
      ? req.query.cimke_ids.map(id => parseInt(id))
      : req.query.cimke_ids
        ? [parseInt(req.query.cimke_ids)]
        : [];

    const whereClause = {};
    if (kategoria_id) {
      whereClause.kategoria_id = kategoria_id;
    }

    if (kereses) {
      whereClause[db.Sequelize.Op.or] = [
        { cim: { [db.Sequelize.Op.iLike]: `%${kereses}%` } },
        { tartalom: { [db.Sequelize.Op.iLike]: `%${kereses}%` } }
      ];
    }

    // Itt építjük az include-ot dinamikusan
    const include = [
      { model: User, as: 'szerzo', attributes: ['user_id', 'felhasznalonev'] },
      { model: User, as: 'modosito', attributes: ['user_id', 'felhasznalonev'] },
      { model: Kategoria, as: 'kategoria', attributes: ['kategoria_id', 'nev'] }
    ];

    // Ha címke szűrés van, azt külön adjuk hozzá
    if (cimke_ids.length > 0) {
      include.push({
        model: Cimke,
        as: 'cimkek',
        where: { cimke_id: cimke_ids },
        through: { attributes: [] }
      });
    } else {
      include.push({
        model: Cimke,
        as: 'cimkek',
        through: { attributes: [] }
      });
    }

    const tudasanyagok = await Tudasanyag.findAll({
      where: whereClause,
      include,
      order: [['modositva', 'DESC']]
    });

    res.json(tudasanyagok);
  } catch (error) {
    console.error('Hiba a tudásanyagok lekérésekor:', error);
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


const getTudasanyagById = async (req, res) => {
  try {
    const id = req.params.id;
    const tudasanyag = await Tudasanyag.findByPk(id, {
      include: [
        { model: User, as: 'szerzo' },
        { model: User, as: 'modosito' },
        { model: Cimke, as: 'cimkek', through: { attributes: [] } },
        { model: Kategoria, as: 'kategoria' }
      ]
    });

    if (!tudasanyag) {
      return res.status(404).json({ error: 'Nem található tudásanyag ezzel az azonosítóval.' });
    }

    res.json(tudasanyag);
  } catch (error) {
    console.error("Hiba a tudásanyag lekérésekor:", error);
    res.status(500).json({ error: "Belső szerverhiba" });
  }
};


module.exports = {
  getAllTudasanyagok,
  getTudasanyagById,
  createTudasanyag
};
