const db = require('../Models');
const Log = db.logs;
const User = db.users;

exports.createLog = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { action } = req.body;

    await Log.create({
      user_id: userId,
      action
    });

    res.status(201).json({ message: 'Log mentve' });
  } catch (err) {
    console.error('Log mentési hiba:', err);
    res.status(500).json({ error: 'Szerverhiba' });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.findAll({
      include: [{
        model: User,
        attributes: ['felhasznalonev']
      }],
      order: [['timestamp', 'DESC']]
    });
    res.json(logs);
  } catch (err) {
    console.error('Log lekérési hiba:', err);
    res.status(500).json({ error: 'Szerverhiba' });
  }
};
