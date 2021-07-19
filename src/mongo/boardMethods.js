const { BOARDS_COLLECTION_NAME } = require("../constants");
const dBConnection = require("./DbConnection");

// ## Board methods
// ##

const board = async (idBoard = null, boardName) => {
  const boardsCollection = await dbConnection.getCollectionInfos({
    name: BOARDS_COLLECTION_NAME,
  });
  if (idBoard) {
    await dBConnection.boardsCollection.find({ _id: idBoard });
  } else if (boardName) {
    await dBConnection.boardsCollection.find({ name: boardName });
  } else {
    // return error/warning
  }
};

async function fn() {
  const r = await mongoClient
    .db("temp")
    .collection("persons")
    .insertOne({ nome: "Ana" });
  console.log(r);
}

const boardCreate = async (boardInstance) => {
  console.log("boardCreate- List database-", dBConnection);
  const result = await dBConnection
    .db("trelho")
    .collection(BOARDS_COLLECTION_NAME)
    .insertOne({ boardInstance });
  
  return result;
};

const boardDelete = (name) => {
  console.log("boardDelete");
};

const boardRename = (name) => {};

const boardAddList = (name, list) => {};

const boardChangeVisibility = (name, visibility) => {};

module.exports = {
  board,
  boardRename,
  boardAddList,
  boardDelete,
  boardCreate,
  boardAddList,
  boardChangeVisibility,
};

const obj = { name: "list-1", globalVisibility: false, lists: [] };
