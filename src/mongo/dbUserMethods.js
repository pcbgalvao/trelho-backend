const { USERS_COLLECTION_NAME } = require("../constants");
const DbConnection = require("./DbConnection");

const dbUserMethods = Object.create(DbConnection);
dbUserMethods.init(USERS_COLLECTION_NAME);

// ## Users methods
// ##
dbUserMethods.getUserDB = async function getUserDB(username) {
  let result = await this.dbCollection
    .findOne(username, { username: 1, fullname: 1, role: 1 });
  return result;
};

dbUserMethods.createUser = async function createUser  (userForm) {
  userForm.creationtimestamp = Date.now();
  const result = await this.dbConnection
    .db("trelho")
    .collection(USERS_COLLECTION_NAME)
    .insertOne(userForm);

  return result.ops[0];
};

dbUserMethods.getRegisteredUsers = async function getRegisteredUsers() {
  const result = await this.dbConnection
    .db("trelho")
    .collection(USERS_COLLECTION_NAME)
    .find()
    .toArray();

  return result;
};

module.exports = dbUserMethods;
