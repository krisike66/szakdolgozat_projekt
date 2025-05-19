module.exports = (sequelize, DataTypes) => {
  const Komment = sequelize.define('komment', {
    komment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    szoveg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    letrehozva: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return Komment;
};
