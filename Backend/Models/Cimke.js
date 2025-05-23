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
        kategoria_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'cimkek',
        timestamps: false,
    });
    return Cimke;
};
