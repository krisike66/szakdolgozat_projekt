module.exports = (sequelize, DataTypes) => {
  const Hasonlo = sequelize.define('hasonlo_tudasanyagok', {
    tudasanyag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    hasonlo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'hasonlo_tudasanyagok'
  });

  return Hasonlo;
};
