module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("message", {
      senderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipientID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(2000), //to limit the data
        allowNull: true,
      },
      hasBeenViewed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    });

    return Message;
  };
