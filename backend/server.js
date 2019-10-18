const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
require('dotenv').config();
const route = require('./express_routes/routes');

// Setup server
const app = express();
app.set('env', process.env.NODE_ENV || 'production')
app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'data')))
const port = 4000;
app.use('/', route);

// Start server
app.listen(process.env.PORT || port, () => {
    console.log(`${process.env.NODE_ENV} server started on port ${process.env.PORT || port}`);
})
