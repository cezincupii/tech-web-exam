module.exports = (sequelize, DataTypes) => {
    const Spacecraft = sequelize.define('spacecraft', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: DataTypes.STRING,
        maxSpeed: DataTypes.INTEGER,
        mass:DataTypes.INTEGER,
        astronautId:DataTypes.INTEGER
    });

    Spacecraft.associate = models => {
        Spacecraft.belongsTo(models.astronaut, {
            as: 'spacecraft',
            foreignKey: "astronautId"
        });

    }

    return Spacecraft;
}