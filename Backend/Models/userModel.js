// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    felhasznalonev: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  },
  {
    tableName: 'felhasznalok',
    timestamps: false,
  });

  User.associate = (models) => {
      User.hasMany(models.ertesites, {
        foreignKey: 'user_id',
        as: 'ertesitesek'
      });
  };

  return User;
};
