const db = require('../Models');
const jwt = require('jsonwebtoken');

const Komment = db.komment;
const Ertekeles = db.ertekeles;

// Új komment létrehozása
exports.addKomment = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token szükséges' });

    const decoded = jwt.verify(token, process.env.secretKey);
    const { szoveg, tudasanyag_id } = req.body;

    const komment = await Komment.create({
      szoveg,
      tudasanyag_id,
      user_id: decoded.user_id,
      letrehozva: new Date()
    });
    
    const tud = await db.tudasanyag.findByPk(tudasanyag_id);
    if (!tud) {
      console.warn('Tudásanyag nem található, nem lehet értesítést küldeni.');
    } else if (tud.letrehozva_altala !== decoded.user_id) {
      await db.ertesites.create({
        user_id: tud.letrehozva_altala,
        tipus: "Komment",
        uzenet: `Valaki hozzászólt a "${tud.cim}" tudásanyagodhoz.`,
        olvasott: false
      });
    }
    res.status(201).json(komment);
  } catch (err) {
    console.error("Hiba komment mentésekor:", err);
    res.status(500).json({ error: 'Belső hiba' });
  }
};

// Tudásanyaghoz tartozó kommentek lekérdezése
exports.getKommentekByTudasanyag = async (req, res) => {
  try {
    const kommentek = await Komment.findAll({
      where: { tudasanyag_id: req.params.id },
      include: [{ model: db.users, attributes: ['felhasznalonev'] }],
      order: [['letrehozva', 'DESC']]
    });

    res.json(kommentek);
  } catch (err) {
    console.error("Hiba kommentek lekérdezésekor:", err);
    res.status(500).json({ error: 'Belső hiba' });
  }
};

// Új értékelés mentése vagy frissítése
exports.addOrUpdateErtekeles = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token szükséges' });

    const decoded = jwt.verify(token, process.env.secretKey);
    const { ertekeles, tudasanyag_id } = req.body;

    const [record, created] = await Ertekeles.upsert({
      ertekeles,
      tudasanyag_id,
      user_id: decoded.user_id
    }, { returning: true });

    const tudasanyag = await db.tudasanyag.findByPk(tudasanyag_id);
    if (tudasanyag && tudasanyag.letrehozva_altala !== decoded.user_id) {
      await db.ertesites.create({
        user_id: tudasanyag.letrehozva_altala,
        tipus: "Értékelés",
        uzenet: `Valaki értékelte a "${tudasanyag.cim}" tudásanyagod.`,
        olvasott: false
      });
    }

    res.json({ message: created ? 'Létrehozva' : 'Frissítve', adatok: record });
  } catch (err) {
    console.error("Hiba értékelés mentésénél:", err);
    res.status(500).json({ error: 'Belső hiba' });
  }
};


// Tudásanyag átlagértékelésének lekérdezése
exports.getErtekelesAtlag = async (req, res) => {
  try {
    const result = await Ertekeles.findAll({
      where: { tudasanyag_id: req.params.id },
      attributes: [[db.Sequelize.fn('AVG', db.Sequelize.col('ertekeles')), 'atlag']]
    });

    res.json(result[0]);
  } catch (err) {
    console.error("Hiba értékelés átlag lekérdezésénél:", err);
    res.status(500).json({ error: 'Belső hiba' });
  }
};


exports.getUserRating = async (req, res) => {
  const { tudasanyag_id } = req.params;
  const user_id = req.user.user_id;

  try {
    const ertekeles = await db.ertekeles.findOne({
      where: {
        user_id,
        tudasanyag_id
      }
    });

    if (ertekeles) {
      res.json({ ertekeles: ertekeles.ertekeles });
    } else {
      res.json({ ertekeles: null });
    }
  } catch (error) {
    console.error('Hiba az értékelés lekérésekor:', error);
    res.status(500).json({ error: 'Belső hiba' });
  }
};


exports.getTopRatedTudasanyagok = async (req, res) => {
  try {
    const results = await db.ertekeles.findAll({
      attributes: [
        'tudasanyag_id',
        [db.Sequelize.fn('AVG', db.Sequelize.col('ertekeles')), 'atlag']
      ],
      group: ['ertekeles.tudasanyag_id', 'tudasanyag.tudasanyag_id', 'tudasanyag->szerzo.user_id'],
      order: [[db.Sequelize.literal('atlag'), 'DESC']],
      limit: 5,
      include: [
        {
          model: db.tudasanyag,
          as: 'tudasanyag',
          include: [
            { model: db.users, as: 'szerzo', attributes: ['user_id', 'felhasznalonev'] }
          ]
        }
      ]
    });

    const topTudasanyagok = results
      .map(r => ({
        ...r.tudasanyag?.dataValues,
        atlag: parseFloat(r.dataValues.atlag).toFixed(2)
      }))
      .filter(Boolean);

    res.json(topTudasanyagok);
  } catch (err) {
    console.error("Top értékelt tudásanyagok lekérési hiba:", err);
    res.status(500).json({ error: "Belső hiba" });
  }
};


