const { CARDS_COLLECTION_NAME } = require("../constants");
const DbConnection = require("./DbConnection");

const dbCardsMethods = Object.create(DbConnection);
dbCardsMethods.init();

// ## Cards DB methods
// ##

dbCardsMethods.getCardsList = async () => {
  const result = await this.dbConnection
    .db("trelho")
    .collection(CARDS_COLLECTION_NAME)
    .find();

  return result.toArray();
};

dbCardsMethods.deleteCardId = async function getRegisteredUsers(idCard) {
  const result = await this.dbConnection
    .db("trelho")
    .collection(CARDS_COLLECTION_NAME)
    .deleteOne({ _id: idCard });

  return result;
};

dbCardsMethods.renameCardTitle = async function getRegisteredUsers() {
  const result = await this.dbConnection
    .db("trelho")
    .collection(CARDS_COLLECTION_NAME)
    .find()
    .toArray();

  return result;
};

dbCardsMethods.createCard = async function getRegisteredUsers(cardForm) {
  const result = await this.dbConnection
    .db("trelho")
    .collection(CARDS_COLLECTION_NAME)
    .insertOne({ cardForm });

  return result;
};

module.exports = dbCardsMethods;
