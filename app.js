const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const kittenRouter = require('./routes/kitten');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/kitten', kittenRouter);

// eslint-disable-next-line no-unused-vars
app.use(({ status, message }, req, res, _next) => {
  res.status(status).send(message);
});

module.exports = app;
