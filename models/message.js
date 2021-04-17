module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("message", {
      content: {
        type: DataTypes.STRING(2000), //to limit the data
        allowNull: true,
      },
      conversationGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // hasBeenViewed: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false
      // }
    });

    return Message;
  };
