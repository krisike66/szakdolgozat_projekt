const db = require('../Models');
const Hasonlo = db.hasonlo_tudasanyagok;

const getHasonloFromDb = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const eredmeny = await Hasonlo.findAll({
      where: { tudasanyag_id: id },
      order: [['score', 'DESC']],
      limit: 3
    });

    const tudasanyagok = await Promise.all(
      eredmeny.map(async ({ hasonlo_id, score }) => {
        const tudasanyag = await db.tudasanyag.findByPk(hasonlo_id);
        return { ...tudasanyag.toJSON(), score };
      })
    );

    res.json(tudasanyagok);
  } catch (err) {
    console.error("Hasonló tudásanyag DB lekérési hiba:", err);
    res.status(500).json({ error: "Belső szerverhiba" });
  }
};

module.exports = { getHasonloFromDb };
