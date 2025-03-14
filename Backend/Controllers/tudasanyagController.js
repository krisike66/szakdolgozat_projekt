// controllers/tudasanyagController.js

const db = require('../Models');
const Tudasanyag = db.tudasanyag; // A fent létrehozott modell

// Összes tudásanyag lekérése
const getAllTudasanyagok = async (req, res) => {
  try {
    const tudasanyagok = await Tudasanyag.findAll();
    res.status(200).json(tudasanyagok);
  } catch (error) {
    console.error('Hiba a tudásanyagok lekérésekor:', error);
    res.status(500).json({ error: 'Belső szerver hiba' });
  }
};

// Egy konkrét tudásanyag lekérése ID alapján
const getTudasanyagById = async (req, res) => {
  try {
    const id = req.params.id;
    const tudasanyag = await Tudasanyag.findByPk(id);
    if (!tudasanyag) {
      return res.status(404).json({ error: 'A kért tudásanyag nem található.' });
    }
    res.status(200).json(tudasanyag);
  } catch (error) {
    console.error('Hiba egy tudásanyag lekérésekor:', error);
    res.status(500).json({ error: 'Belső szerver hiba' });
  }
};

module.exports = {
  getAllTudasanyagok,
  getTudasanyagById
};
