const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbController = {};

let url =
  "mongodb://neighborhoodguide:26stmarksplace@ds127362.mlab.com:27362/neighborhood-guide";
// "mongodb://violent-hunters:123abc@ds143143.mlab.com:43143/violent-hunters";

dbController.getCollections = (req, res) => {
  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
  mongoose.connection.on("open", () => {
    const collections = mongoose.connection.db.listCollections().toArray();
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

dbController.connect = (req, res, next) => {
  const { username, password, authoPort, address, dbName } = req.body;
  url = `mongodb://${username}:${password}@${address}:${authoPort}/${dbName}`;
  next();
};

dbController.getDocuments = (req, res) => {
  console.log("i am here");
  console.log("req.params", req.params);
  const colName = req.params.colName;
  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
  mongoose.connection.on("open", () => {
    let modelNames = mongoose.connection.modelNames();
    console.log("modelNAmes", modelNames);
    let Collection;
    if (modelNames.indexOf(colName) !== -1) {
      Collection = mongoose.connection.model(colName);
    } else {
      Collection = mongoose.model(colName, new Schema({}), colName);
    }
    // console.log(Collection);
    Collection.find().then(docs => {
      console.log("IT REACHES HERE");
      res.send(docs);
    });
  });
};

dbController.getDatabase = (req, res, next) => {
  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
  // Runs this logic once there is an open connection with the database
  mongoose.connection.on("open", () => {
    // Gets all the collections inside our database and turns it into an array
    const collections = mongoose.connection.db.listCollections().toArray();
    // collections returns a promise so we use .then
    //* We need async await here so that we properly saving the documents in our response
    collections
      .then(async collections => {
        try {
          // we loop through the collections and use .find to get all the documents in the collection
          for (let i = 0; i < collections.length; i++) {
            let collectionName = collections[i].name;
            let modelNames = mongoose.connection.modelNames();
            let Collection;
            console.log("collName", collectionName);
            console.log("modelName", modelNames);

            // * Await allows us to properly save our documents

            if (modelNames.indexOf(collectionName) !== -1) {
              Collection = mongoose.connection.model(collectionName);
            } else {
              Collection = mongoose.model(
                collectionName,
                new Schema({}),
                collectionName
              );
            }

            // * Await allows us to properly save our documents
            await Collection.find().then(docs => {
              console.log("IT REACHES HERE");
              res.locals[collectionName] = docs;
            });
          }
          next();
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => console.log("-----CollectionError-----", err));
  });
};

module.exports = dbController;
