const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

require('./app/router')(app);

app.listen(process.env.PORT || 80, () => {
    console.log(process.env.DB_HOST)
    console.log('App listening on port 8080!');
});
//
// const db = require('./app/db/db.config.js');
//
// db.sequelize.sync({force: true}).then(() => {
// 	console.log('Drop and Resync with { force: true }');
// });
