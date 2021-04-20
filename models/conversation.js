module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define("conversation", {

    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

return Conversation;
};
    
