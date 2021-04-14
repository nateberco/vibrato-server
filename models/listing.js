module.exports = (sequelize, DataTypes) => {
    const Listing = sequelize.define("listing", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photoURL: {
        type: DataTypes.STRING(2000), //to limit the data
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keywords: {
        type: DataTypes.STRING,
        allowNull: true,
      },

    });

    return Listing;
  };



  