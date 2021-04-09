module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        latitude: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        longitude: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true  
        },
        social: {
            type: DataTypes.STRING,
            allowNull: true  
        }
    })

    return User;
};