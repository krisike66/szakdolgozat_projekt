const db = require('../Models');
const Kategoria = db.kategoria;

const getAllKategoriak = async (req, res) => {
  try {
    const kategoriak = await Kategoria.findAll({ order: [['kategoria_id', 'ASC']] });
    res.json(kategoriak);
  } catch (error) {
    console.error('Kategóriák lekérdezése hiba:', error);
    res.status(500).json({ error: 'Belső szerver hiba' });
  }
};

module.exports = { getAllKategoriak };