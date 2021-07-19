const { CHECKLISTS_ITEMS_COLLECTION_NAME } = require("../constants");
const DbConnection = require("./DbConnection");
var ObjectId = require("mongodb").ObjectID;

const dbChecklistItemsMethods = Object.create(DbConnection);
dbChecklistItemsMethods.setCollection(CHECKLISTS_ITEMS_COLLECTION_NAME);

// ## Cards DB methods
// ##

dbChecklistItemsMethods.createItem = async function createItem( newItem ) {
  newItem.creationtimestamp = Date.now();
  const resultCreateItem = await this.dbCollection.insertOne(newItem);
  return resultCreateItem.ops[0];
};

dbChecklistItemsMethods.getItems = async function getItems(searchFields
) {
  const resultGetItemns = await this.dbCollection
    .find (searchFields)
    .toArray();

  return resultGetItemns;
};

dbChecklistItemsMethods.updateItem = async function updateItem(
  checklistId,
  updatedItem
) {
  const checklistsResult = await this.dbCollection.update(
    { _id: new ObjectId(checklistId), "items._id": updatedItem._id },
    { $set: { "items.$": updatedItem } },
    { returnNewDocument: true }
  );

  return checklistsResult;
};



dbChecklistItemsMethods.deleteItem = async function deleteItem(
  idItem
) {
  const resultDeleteChecklist = await this.dbCollection.deleteOne({
    _id: new ObjectId(idItem),
  });

  return resultDeleteChecklist;
};

module.exports = dbChecklistItemsMethods;
