const assert = require("assert");
const {
  USERS_COLLECTION_NAME,
  DB_NAME,
  MONGO_CONNECTION_STRING,
} = require("../constants");
const MongoClient = require("mongodb").MongoClient;

const DbConnection = {
  init: async function init() {
    this.dbConnection = new MongoClient(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbConnection = await this.dbConnection.connect();
    //this.dbConnection = this.dbConnection.db(DB_NAME);
    console.log("List database-", this.dbConnection);

    //    let result = this.dbConnection
    //      .db("trelho")
    //      .collection(USERS_COLLECTION_NAME)
    //      .findOne({
    //        username: "a",
    //      });

    //console.log(result);
  },
};

module.exports = DbConnection;
