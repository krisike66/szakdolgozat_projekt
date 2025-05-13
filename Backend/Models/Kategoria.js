// Models/Kategoria.js

module.exports = (sequelize, DataTypes) => {
  const Kategoria = sequelize.define('Kategoria', {
    kategoria_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nev: {
      type: DataTypes.STRING,
      allowNull: false
    },
    leiras: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'kategoria',
    timestamps: false
  });

  return Kategoria;
};