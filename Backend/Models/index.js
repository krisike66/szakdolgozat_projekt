const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(`postgres://admin:Krisike66@localhost:5432/db_tudasbazis`, { dialect: "postgres" });

sequelize.authenticate()
  .then(() => console.log("Database connected to tudasbazis"))
  .catch((err) => console.log(err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize, DataTypes);
db.cimke = require('./Cimke')(sequelize, DataTypes);
db.tudasanyag = require('./Tudasanyag')(sequelize, DataTypes);
db.kategoria = require('./Kategoria')(sequelize, DataTypes);
db.logs = require('./logs')(sequelize, Sequelize);

db.komment = require('./kommentModel')(sequelize, DataTypes);
db.ertekeles = require('./ertekelesModel')(sequelize, DataTypes);
db.ertesites = require('./ertesites')(sequelize, DataTypes);



Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.tudasanyag.belongsTo(db.users, {
  foreignKey: 'letrehozva_altala',
  as: 'szerzo',
  onDelete: 'SET NULL'
});
db.users.hasMany(db.tudasanyag, {
  foreignKey: 'letrehozva_altala',
  as: 'letrehozottTudasanyagok'
});


db.tudasanyag.belongsTo(db.users, {
  foreignKey: 'modositva_altala',
  as: 'modosito',
  onDelete: 'SET NULL'
});
db.users.hasMany(db.tudasanyag, {
  foreignKey: 'modositva_altala',
  as: 'modositottTudasanyagok'
});


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

db.logs.belongsTo(db.users, { foreignKey: 'user_id' });


db.komment.belongsTo(db.tudasanyag, {
  foreignKey: 'tudasanyag_id'
});
db.komment.belongsTo(db.users, {
  foreignKey: 'user_id'
});


db.tudasanyag.hasMany(db.ertekeles, {
  foreignKey: 'tudasanyag_id',
  onDelete: 'CASCADE'
});

db.ertekeles.belongsTo(db.tudasanyag, {
  foreignKey: 'tudasanyag_id'
});
db.ertekeles.belongsTo(db.users, {
  foreignKey: 'user_id'
});

module.exports = db;
