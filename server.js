const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

require('./app/router')(app);

app.listen(8080, () => {
    console.log('App listening on port 8080!');
});

// const db = require('./app/db/db.config.js');
//
// db.sequelize.sync({force: true}).then(() => {
// 	console.log('Drop and Resync with { force: true }');
// });
