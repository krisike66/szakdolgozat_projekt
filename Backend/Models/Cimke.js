// Models/Cimke.js
module.exports = (sequelize, DataTypes) => {
    const Cimke = sequelize.define('Cimke', {
        cimke_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nev: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'cimkek',
        timestamps: false,
    });

    Cimke.associate = (models) => {
        Cimke.belongsToMany(models.Tudasanyag, {
            through: 'tudasanyag_cimke',
            foreignKey: 'cimke_id',
            otherKey: 'tudasanyag_id',
            as: 'tudasanyagok'
        });
    };

    return Cimke;
};
