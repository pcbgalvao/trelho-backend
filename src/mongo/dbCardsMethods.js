const { CARDS_COLLECTION_NAME } = require("../constants");
const DbConnection = require("./DbConnection");
var ObjectId = require("mongodb").ObjectID;

const dbCardsMethods = Object.create(DbConnection);
dbCardsMethods.setCollection(CARDS_COLLECTION_NAME);

// ## Cards DB methods
// ##

dbCardsMethods.createCard = async function getRegisteredUsers(cardForm) {
  cardForm.creationtimestamp = Date.now();
  const result = await this.dbCollection.insertOne({ ...cardForm });

  return result.ops[0];
};

dbCardsMethods.getCardsList = async function getCardsList(cardsFindFields) {
  const resultCardsDbFind = await this.dbCollection
    .find(cardsFindFields)
    .toArray();

  return resultCardsDbFind;
};

dbCardsMethods.deleteCard = async function getRegisteredUsers(idCard) {
  const resultDeleteCard = await this.dbCollection.deleteOne({
    _id: new ObjectId(idCard),
  });

  return resultDeleteCard;
};

dbCardsMethods.renameFieldCard = async function renameFieldCard(
  {_id,
  field,
  newvalue}
) {
  const resultDB = await this.dbCollection.update(
    { _id: new ObjectId(_id) },
    { $set: { [field]: newvalue } }
  );

  return resultDB;
};

module.exports = dbCardsMethods;
