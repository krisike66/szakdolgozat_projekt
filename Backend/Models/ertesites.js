// Models/ertesites.js
module.exports = (sequelize, DataTypes) => {
  const Ertesites = sequelize.define('ertesites', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uzenet: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    olvasott: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'ertesitesek',
    timestamps: true
  });

  return Ertesites;
};
