module.exports = (sequelize, DataTypes) => {
    const Astronaut = sequelize.define('astronaut', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: DataTypes.STRING,
        role: DataTypes.STRING
    });

    Astronaut.associate = models => {
        Astronaut.hasMany(models.spacecraft, {
            onDelete: "cascade"
        });
    }
    return Astronaut;

}