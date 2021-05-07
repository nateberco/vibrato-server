const Sequelize = require('sequelize');
// const sequelize = new Sequelize('vibrato', 'postgres', 'password', {
//     host: 'localhost',
//     dialect: 'postgres'
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    //comment below lines to test locally
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
})

sequelize.authenticate().then(
    function(){
        console.log('Connect to vibrato postgres database');
    },
    function(err){
        console.log(err);
    }
);

User = sequelize.import('./models/user');
Listing = sequelize.import('./models/listing');
Message = sequelize.import('./models/message');
Conversation = sequelize.import('./models/conversation');

User.hasMany(Listing);
Listing.belongsTo(User);

Conversation.hasMany(Message);
Message.belongsTo(Conversation);

// Conversation.associate = (models) => {
//     Conversations.hasMany(models.Message); 
//     models.Message.belongsTo(Conversation); 
//     };

module.exports = sequelize;