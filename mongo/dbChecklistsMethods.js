const { CHECKLISTS_COLLECTION_NAME } = require("../constants");
const DbConnection = require("./DbConnection");
var ObjectId = require("mongodb").ObjectID;

const dbChecklistsMethods = Object.create(DbConnection);
dbChecklistsMethods.setCollection(CHECKLISTS_COLLECTION_NAME);

// ## Cards DB methods
// ##

dbChecklistsMethods.create = async function getRegisteredUsers(checklistForm) {
  checklistForm.creationtimestamp = Date.now();
  const result = await this.dbCollection.insertOne({ ...checklistForm });

  return result.ops[0];
};

dbChecklistsMethods.getChecklists = async function getChecklists(
  checklistForm
) {
  const checklistsResult = await this.dbCollection
    .find(checklistForm)
    .toArray();

  return checklistsResult;
};


dbChecklistsMethods.deleteCard = async function getRegisteredUsers(
  idChecklist
) {
  const resultDeleteChecklist = await this.dbCollection.deleteOne({
    _id: new ObjectId(idChecklist),
  });

  return resultDeleteChecklist;
};

dbChecklistsMethods.renameFieldCard = async function renameFieldCard({
  _id,
  field,
  newvalue,
}) {
  const resultDB = await this.dbCollection.update(
    { _id: new ObjectId(_id) },
    { $set: { [field]: newvalue } }
  );

  return resultDB;
};

module.exports = dbChecklistsMethods;
