// Models/index.js
const { Sequelize, DataTypes } = require('sequelize');

// Database connection
const sequelize = new Sequelize(`postgres://admin:Krisike66@localhost:5432/db_tudasbazis`, { dialect: "postgres" });

sequelize.authenticate()
  .then(() => console.log("Database connected to tudasbazis"))
  .catch((err) => console.log(err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require('./userModel')(sequelize, DataTypes);
db.cimke = require('./Cimke')(sequelize, DataTypes);
db.tudasanyag = require('./Tudasanyag')(sequelize, DataTypes);
db.kategoria = require('./Kategoria')(sequelize, DataTypes);

// Define associations
// Szerző kapcsolat
db.tudasanyag.belongsTo(db.users, {
  foreignKey: 'letrehozva_altala',
  as: 'szerzo',
  onDelete: 'SET NULL'
});
db.users.hasMany(db.tudasanyag, {
  foreignKey: 'letrehozva_altala',
  as: 'letrehozottTudasanyagok'
});

// Módosító kapcsolat
db.tudasanyag.belongsTo(db.users, {
  foreignKey: 'modositva_altala',
  as: 'modosito',
  onDelete: 'SET NULL'
});
db.users.hasMany(db.tudasanyag, {
  foreignKey: 'modositva_altala',
  as: 'modositottTudasanyagok'
});

// Címke kapcsolat (Many-to-Many)
db.tudasanyag.belongsToMany(db.cimke, {
  through: {
    model: 'tudasanyag_cimke',
    unique: false,
    timestamps: false,
  },
  foreignKey: 'tudasanyag_id',
  otherKey: 'cimke_id',
  as: 'cimkek'
});
db.cimke.belongsToMany(db.tudasanyag, {
  through: {
    model: 'tudasanyag_cimke',
    unique: false,
    timestamps: false,
  },
  foreignKey: 'cimke_id',
  otherKey: 'tudasanyag_id',
  as: 'tudasanyagok'
});

db.kategoria.hasMany(db.tudasanyag, {
  foreignKey: 'kategoria_id',
  as: 'tudasanyagok'
});

db.tudasanyag.belongsTo(db.kategoria, {
  foreignKey: 'kategoria_id',
  as: 'kategoria'
});

// Attach models to db object
module.exports = db;
