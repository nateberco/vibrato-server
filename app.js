require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let listing = require("./controllers/listingController");
let user = require('./controllers/userController');
let message = require('./controllers/messageController');
let conversation =

sequelize.sync();
// sequelize.sync({force:true}) //to delete rows in pgAdmin
// app.use(require('./middleware/headers'));

app.use(express.json());

app.use('/user', user);
app.use("/listing", listing);
app.use('/message', message);


// app.use(require('./middleware/validateSession'));
// app.use(require('./middleware/validateAdmin')); // No Need for These

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});
