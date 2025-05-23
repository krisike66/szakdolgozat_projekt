const jwt = require('jsonwebtoken');
const db = require('../Models');
const Tudasanyag = db.tudasanyag;
const User = db.users;
const Cimke = db.cimke;
const Kategoria = db.kategoria;

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

    if (req.query.includeAll !== 'true') {
      whereClause.audit_approved = true;
    }

    const include = [
      { model: User, as: 'szerzo', attributes: ['user_id', 'felhasznalonev'] },
      { model: User, as: 'modosito', attributes: ['user_id', 'felhasznalonev'] },
      { model: Kategoria, as: 'kategoria', attributes: ['kategoria_id', 'nev'] }
    ];

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


const createTudasanyag = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Autentikáció szükséges' });
    }

    const decoded = jwt.verify(token, process.env.secretKey);
    const userId = decoded.user_id;

    const cim = req.body.cim;
    const tartalom = req.body.tartalom;
    const kategoria_id = req.body.kategoria_id;
    let cimkek = req.body.cimkek;

    if (typeof cimkek === 'string') {
      cimkek = [cimkek];
    }

    const filePath = req.file ? req.file.filename : null;
    const newTudasanyag = await Tudasanyag.create({
      cim,
      tartalom,
      kategoria_id,
      letrehozva: new Date(),
      modositva: new Date(),
      letrehozva_altala: userId,
      modositva_altala: userId,
      audit_approved: false,
      file: filePath
    });
    console.log("Decoded token:", decoded);
    if (cimkek && cimkek.length > 0) {
      const cimkeObjektek = await Cimke.findAll({
        where: {
          cimke_id: cimkek
        }
      });
      await newTudasanyag.addCimkek(cimkeObjektek);
    }

    await db.logs.create({
      user_id: userId,
      action: `Tudásanyag létrehozva: ${cim}`,
      timestamp: new Date()
    });

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

const deleteTudasanyag = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const tudasanyag = await db.tudasanyag.findByPk(id);

  if (!tudasanyag) {
    return res.status(404).json({ error: 'Tudásanyag nem található' });
  }

  const isOwner = tudasanyag.letrehozva_altala === user.user_id;
  const isAdmin = user.role === 'admin';

  if (!isAdmin && !isOwner) {
    return res.status(403).json({ error: 'Nincs jogosultságod a törléshez' });
  }

  await tudasanyag.destroy();

  await db.logs.create({
    user_id: user.user_id,
    action: `Tudásanyag törölve: ${tudasanyag.cim}`,
    timestamp: new Date()
  });

  res.status(200).json({ message: 'Törölve' });
};

const approveTudasanyag = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'auditer' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Csak auditerek vagy adminok hagyhatják jóvá' });
  }

  const tudasanyag = await db.tudasanyag.findByPk(id);
  if (!tudasanyag) return res.status(404).json({ error: 'Nem található' });

  await tudasanyag.update({
    audit_approved: true,
    approved_by: req.user.user_id
  });

  await db.logs.create({
    user_id: req.user.user_id,
    action: `Tudásanyag jóváhagyva: ${tudasanyag.cim}`,
    timestamp: new Date()
  });
  const tud = await db.tudasanyag.findByPk(id);
  await db.ertesites.create({
      user_id: tud.letrehozva_altala,
      tipus: "Jóváhagyás",
      uzenet: `A "${tud.cim}" című tudásanyagodat jóváhagyták.`,
      olvasott: false
    });

  res.json({ message: 'Jóváhagyva' });
};

const updateTudasanyag = async (req, res) => {
  try {
    const { id } = req.params;
    const cim = req.body.cim;
    const tartalom = req.body.tartalom;
    const kategoria_id = req.body.kategoria_id;
    let cimkek = req.body.cimkek;
    const user = req.user;

    const tudasanyag = await db.tudasanyag.findByPk(id, {
      include: [{ model: db.cimke, as: 'cimkek' }]
    });

    if (!tudasanyag) {
      return res.status(404).json({ error: 'Tudásanyag nem található' });
    }

    const isAdmin = user.role === 'admin';
    const isOwner = user.user_id === tudasanyag.letrehozva_altala;
    const isAuditer = user.role === 'auditer';

    if (isAuditer && tudasanyag.audit_approved === true) {
      return res.status(403).json({ error: 'Ez a tudásanyag már jóvá lett hagyva, nem módosítható auditorként.' });
    }

    if (!isAdmin && !isOwner && !isAuditer) {
      return res.status(403).json({ error: 'Nincs jogosultságod a módosításhoz' });
    }

    if (typeof cimkek === 'string') {
      cimkek = [cimkek]; 
    }

    const filePath = req.file ? req.file.filename : tudasanyag.file;
    await tudasanyag.update({
      cim,
      tartalom,
      kategoria_id,
      file: filePath,
      modositva: new Date(),
      modositva_altala: user.user_id,
      audit_approved: false,
      approved_by: null
    });
    if (cimkek && Array.isArray(cimkek)) {
      const cimkeObjektek = await db.cimke.findAll({
        where: { cimke_id: cimkek }
      });
      await tudasanyag.setCimkek(cimkeObjektek);
    }
    await db.logs.create({
      user_id: user.user_id,
      action: `Tudásanyag módosítva: ${cim}`,
      timestamp: new Date()
    });

    res.json({ message: 'Sikeres frissítés', tudasanyag });
  } catch (err) {
    console.error("Tudásanyag módosítási hiba:", err);
    res.status(500).json({ error: 'Belső szerverhiba' });
  }
};


const hasonlok = require('../hasonlok.json');
const getHasonloTudasanyagok = async (req, res) => {
  const id = req.params.id;

  const lista = hasonlok[id];
  if (!lista || lista.length === 0) {
    return res.status(404).json({ error: "Nem található hasonló tudásanyag." });
  }

  try {
    const eredmeny = await db.tudasanyag.findAll({
      where: {
        tudasanyag_id: lista.map(item => item.id)
      },
      attributes: ['tudasanyag_id', 'cim'] 
    });
    const rendezett = lista
      .map(item => {
        const match = eredmeny.find(e => e.tudasanyag_id === item.id);
        return match ? { ...match.dataValues, score: item.score } : null;
      })
      .filter(Boolean);

    res.json(rendezett);
  } catch (error) {
    console.error("Hasonló tudásanyagok hiba:", error);
    res.status(500).json({ error: "Belső hiba" });
  }
};



module.exports = {
  getAllTudasanyagok,
  getTudasanyagById,
  createTudasanyag,
  deleteTudasanyag,
  approveTudasanyag,
  updateTudasanyag,
  getHasonloTudasanyagok
};
