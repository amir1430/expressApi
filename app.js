const express = require('express');
const morgan = require('morgan');
const mongoClient = require('mongodb');
const assert = require('assert');
const bodyparser = require('body-parser');
const userRoute = require('./app/routes/user');
require('./models/database');
const app = express();




app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use('/api', userRoute);
app.use((req, res, next) => {
    const error = new Error('not found');
    res.status(404).json({ result: 'not found' });
});
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: { message: error.message }
//     });
// });
module.exports = app; 