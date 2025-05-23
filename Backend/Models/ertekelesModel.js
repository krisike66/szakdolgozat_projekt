module.exports = (sequelize, DataTypes) => {
  const Ertekeles = sequelize.define('ertekeles', {
    ertekeles_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ertekeles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tudasanyag_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'tudasanyag_id']
      }
    ]
  });

  return Ertekeles;
};
