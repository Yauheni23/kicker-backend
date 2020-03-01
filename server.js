const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

require('./app/router')(app);

app.listen(process.env.PORT || 8080, () => {
    console.log(process.env.DB_HOST);
    console.log(`App listening on port ${process.env.PORT || 8080}!`);
});
