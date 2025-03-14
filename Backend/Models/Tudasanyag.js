// Models/tudasanyag.js
module.exports = (sequelize, DataTypes) => {
    const Tudasanyag = sequelize.define('Tudasanyag', {
      tudasanyag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // <-- Ezzel automatikusan generálódik az érték
      },
      cim: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tartalom: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      letrehozva: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      modositva: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      kategoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      letrehozva_altala: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'tudasanyagok', // Győződj meg róla, hogy a táblanév egyezik!
      timestamps: false, // Ha nincs szükség automatikus createdAt/updatedAt mezőkre
    });
  
    return Tudasanyag;
  };
  