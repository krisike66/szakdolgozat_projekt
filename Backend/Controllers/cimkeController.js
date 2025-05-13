// Controllers/cimkeController.js

const db = require('../Models');
const Cimke = db.cimke;

// Új címke létrehozása
const createCimke = async (req, res) => {
  try {
    const { nev } = req.body;
    const cimke = await Cimke.create({ nev });
    res.status(201).json(cimke);
  } catch (error) {
    console.error('Címke létrehozási hiba:', error);
    res.status(500).json({ error: 'Belső szerver hiba' });
  }
};

// Összes címke lekérése
const getAllCimkek = async (req, res) => {
  try {
    const cimkek = await Cimke.findAll();
    res.status(200).json(cimkek);
  } catch (error) {
    console.error('Címkék lekérési hiba:', error);
    res.status(500).json({ error: 'Belső szerver hiba' });
  }
};

// Egy adott címke lekérése
const getCimkeById = async (req, res) => {
  try {
    const { id } = req.params;
    const cimke = await Cimke.findByPk(id);
    if (!cimke) {
      return res.status(404).json({ error: 'A címke nem található.' });
    }
    res.status(200).json(cimke);
  } catch (error) {
    console.error('Címke lekérési hiba:', error);
    res.status(500).json({ error: 'Belső szerver hiba' });
  }
};

// Címke törlése
const deleteCimke = async (req, res) => {
  try {
    const { id } = req.params;
    const cimke = await Cimke.findByPk(id);
    if (!cimke) {
      return res.status(404).json({ error: 'A címke nem található.' });
    }
    await cimke.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Címke törlési hiba:', error);
    res.status(500).json({ error: 'Belső szerver hiba' });
  }
};

module.exports = {
  createCimke,
  getAllCimkek,
  getCimkeById,
  deleteCimke
};
