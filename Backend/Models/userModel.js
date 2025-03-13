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
          isEmail: true, // Ellenőrzi, hogy email formátumú-e
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
      tableName: 'felhasznalok', // Állítsd be a tábla nevét
      timestamps: false, // Ha szeretnéd a createdAt és updatedAt mezőket
    });
  
    return User;
  };
  