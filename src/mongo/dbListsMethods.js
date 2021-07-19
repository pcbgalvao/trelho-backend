const { LISTS_COLLECTION_NAME } = require("../constants");
const DbConnection = require("./DbConnection");
var ObjectId = require("mongodb").ObjectID;

const dbListsMethods = Object.create(DbConnection);
dbListsMethods.setCollection(LISTS_COLLECTION_NAME);
//console.log ("dbListsMethods-", dbListsMethods)

// ## List CRUD methods
// ##

dbListsMethods.createList = async function createList(listForm) {
  listForm.creationtimestamp = Date.now();
  const resultDbCreateList = await this.dbCollection.insertOne(listForm);

  return resultDbCreateList.ops[0];
};

dbListsMethods.getListRecords = async function getListRecords(listFindFields) {
  //console.log ("getListRecords",this );
  const resultListDbFind = await this.dbCollection
    .find(listFindFields)
    .toArray();

  return resultListDbFind;
};

dbListsMethods.deleteList = async function deleteList(_id) {
  const resultDbDeleteList = await this.dbCollection.deleteOne({
    _id: new ObjectId(_id),
  });

  return resultDbDeleteList;
};

dbListsMethods.renameListName = async function renameListName({
  _id,
  newname,
}) {
  const resultDb = await this.dbCollection.updateOne(
    { _id: new ObjectId(_id) },
    { $set: { name: newname } }
  );

  return resultDb;
};

module.exports = dbListsMethods;
