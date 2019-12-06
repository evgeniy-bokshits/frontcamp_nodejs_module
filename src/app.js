const path = require('path');

const express = require('express');

const app = express();

const router = require('./router');
const usersRoute = require('./usersRouter');

app.use('/', router);
app.use("/users", usersRoute);


app.use((err, req, res, next) => {
    console.error(err);
    res.render((path.join(__dirname+'/error/error.html')), {
      locals: {
        status: err.status || 500,
        message: err.message || 'server error',
      },
    });
  });
  
  module.exports = app;