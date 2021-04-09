const Sequelize = require('sequelize');
const sequelize = new Sequelize('vibrato', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connect to vibrato postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;