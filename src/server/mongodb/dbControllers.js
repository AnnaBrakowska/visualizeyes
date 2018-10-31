const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbController = {};
const GenerateSchema = require('generate-schema');

let url;
// 'mongodb://neighborhoodguide:26stmarksplace@ds127362.mlab.com:27362/neighborhood-guide'
// "mongodb://violent-hunters:123abc@ds143143.mlab.com:43143/violent-hunters";

dbController.getCollections = (req, res) => {
  let dbConn = mongoose.createConnection(
    url,
    { useNewUrlParser: true },
    (err) => {
      if (err){
        res.header(500);
        res.send({
          ConnectionError: 'Invalid Connection URL'
        });
        return;
      }
    }
  );
  dbConn.on("open", () => {
    const collections = dbConn.db.listCollections().toArray();
    collections.then(result => {
      result = result
        .map(obj => {
          return { name: obj.name, uuid: obj.info.uuid };
        })
        .filter(obj => obj.uuid);
      res.send(result);
    });
  });
};

dbController.updateDocument = (req, res) => {
  const { colName, id } = req.params;
  const { newData, docMod } = req.body;
  const newSchema = GenerateSchema.mongoose(docMod);
  let dbConn = mongoose.createConnection(
    url,
    { useNewUrlParser: true },
    (err) => {
      if (err){
        res.header(500);
        res.send({
          ConnectionError: 'Invalid Connection URL'
        });
        return;
      }
    }
  );
  dbConn.on("open", () => {
    let modelNames = dbConn.modelNames();
    let Collection = dbConn.model(colName, new Schema(newSchema), colName);
    Collection.update({"_id": id}, newData, (err, response) => {
      res.send(response);
    });
  })
};

dbController.connect = (req, res, next) => {
  const { username, password, authoPort, address, dbName } = req.body;
  url = `mongodb://${username}:${password}@${address}:${authoPort}/${dbName}`;
  next();
};

dbController.getDocuments = (req, res) => {
  const colName = req.params.colName;
  let dbConn = mongoose.createConnection(
    url,
    { useNewUrlParser: true },
    (err) => {
      if (err){
        res.header(500);
        res.send({
          ConnectionError: 'Invalid Connection URL'
        });
        return;
      }
    }
  );
  dbConn.on("open", () => {
    let modelNames = dbConn.modelNames();
    let Collection = dbConn.model(colName, new Schema({}), colName);
    Collection.find().then(docs => {
      res.send(docs);
    });
  });
};


module.exports = dbController;
