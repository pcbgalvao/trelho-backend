const { USERS_COLLECTION_NAME } = require("../constants");
const DbConnection = require("./DbConnection");

const dbUserMethods = Object.create(DbConnection);
dbUserMethods.init();

// ## Users methods
// ##

dbUserMethods.getUserDB = async function getUserDB(userLogin) {
  let result = await this.dbConnection
    .db("trelho")
    .collection(USERS_COLLECTION_NAME)
    .findOne(userLogin, { username: 1, fullname: 1, role: 1 });

  return result;
};

dbUserMethods.createUser = async (userForm) => {
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
