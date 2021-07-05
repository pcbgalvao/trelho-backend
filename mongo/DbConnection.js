const assert = require("assert");

const {
  USERS_COLLECTION_NAME,
  DB_NAME,
  MONGO_CONNECTION_STRING,
} = require("../constants");
const MongoClient = require("mongodb").MongoClient;

const DbConnection = {
  init: function init() {
    this.dbInstance = new MongoClient(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });    
    this.dbInstance.connect();
    this.dbDatabase = this.dbInstance.db(DB_NAME);    
  },

  setCollection: async function setCollection (collection)  {
    this.dbCollection = await this.dbDatabase.collection(collection) ;
    //console.log ("DbIntance",this.dbCollection );
  },

  close: function close() {
    this.dbInstance.close();
  }
};

module.exports = DbConnection;
