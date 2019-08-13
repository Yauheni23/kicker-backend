const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

require('./app/router')(app);

app.listen(8080, () => {
    console.log('App listening on port 8080!');
});
