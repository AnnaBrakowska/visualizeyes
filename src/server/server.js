const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); //directing path for path__dirname
const PORT = process.env.PORT || 8080;
const app = express();
const dbControllers = require('./mongodb/dbControllers');

const appRouter = express.Router();

app.use(express.static(path.join(__dirname, './../build/webpack-bundle.js')));
app.use(bodyParser.urlencoded({ extended: false }));

//cross origin resource
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use('/app', appRouter);

// Get request to get the database for users
appRouter.get('/getDB', dbControllers.getDatabase, (req, res) => {
  res.status(200).json(res.locals).end();
});

// //if anything else redifect us to index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + 'build/index.html'));
// });

app.listen(8080, () => {
  console.log('listening at http://localhost:8080');
});












