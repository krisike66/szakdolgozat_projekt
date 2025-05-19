// models/Tudasanyag.js
module.exports = (sequelize, DataTypes) => {
  const Tudasanyag = sequelize.define('tudasanyag', {
    tudasanyag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      allowNull: true,
      references: {
        model: 'felhasznalok',
        key: 'user_id'
      }
    },
    modositva_altala: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'felhasznalok',
        key: 'user_id'
      }
    },

    audit_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approved_by: {  
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'tudasanyagok', 
    timestamps: false, 
  });
  return Tudasanyag;
};
