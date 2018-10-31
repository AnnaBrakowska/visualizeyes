const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); //directing path for path__dirname
const PORT = process.env.PORT || 8080;
const app = express();
const dbControllers = require("./mongodb/dbControllers");

const appRouter = express.Router();

app.use(express.static(path.join(__dirname, "./../build/webpack-bundle.js")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// //CLIENT ROUTES
app.get('/', (req, res, next) => {
  res.header(200);
  res.sendFile(path.join(__dirname,'../../build','index.html'))
});
app.get('/webpack-bundle.js', (req, res, next) => {
  res.header(200);
  res.sendFile(path.join(__dirname,'../../build','bundle.js'))
});

app.use('/app', appRouter);

appRouter.get('/db/:colName', dbControllers.getDocuments);
appRouter.post('/db', dbControllers.connect, dbControllers.getCollections);
appRouter.put('/db/:colName/:id', dbControllers.updateDocument);


app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});












