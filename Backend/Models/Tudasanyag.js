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

  // Kapcsolatok beállítása
  Tudasanyag.associate = (models) => {
    // Címke kapcsolat (Many-to-Many)
    Tudasanyag.belongsToMany(models.Cimke, {
      through: 'tudasanyag_cimke',
      foreignKey: 'tudasanyag_id',
      otherKey: 'cimke_id',
      as: 'cimkek'
    });

    // Szerző kapcsolat (Many-to-One)
    Tudasanyag.belongsTo(models.users, {
      foreignKey: 'letrehozva_altala',
      as: 'szerzo',
      onDelete: 'SET NULL'
    });

    // Módosító kapcsolat (Many-to-One)
    Tudasanyag.belongsTo(models.users, {
      foreignKey: 'modositva_altala',
      as: 'modosito',
      onDelete: 'SET NULL'
    });
  };

  return Tudasanyag;
};
