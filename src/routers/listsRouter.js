const express = require("express");
const listsRouter = express.Router();
const dbLists = require("../mongo/dbListsMethods");
const authMiddlewares = require("./authMiddlewares");

const createListHandler = () => async (req, res) => {
  const listForm = req.body;
  const newList = await dbLists.createList(listForm);
  
  const resultListSent = await res.status(200).send({ ...newList }).end();;

};

const getListRecords = () => async (req, res) => {
  const listFindFields =
    Object.keys(req.params).length > 0 ? req.params : req.query;    
  const dataListsFound = await dbLists.getListRecords(listFindFields);
  const resultListSent = await res.status(200).send(dataListsFound).end();

};

const renameListName = () => async (req, res) => {
  const renameListFields = req.params;
  const resultUpdate = await dbLists.renameListName(renameListFields);
  const resultListSent = await res.status(200).send({resultUpdate}).end();
};

const deleteList = () => async (req, res) => {
  const _id = req.params._id;
  const resultDelete = await dbLists.deleteList(_id);
  const resultDeleteSent = 
    await res
      .status(200)
      .send({resultDelete})
      .end();
  
};

//
listsRouter.post("/create", createListHandler());
listsRouter.get("/list/:fk_userid", getListRecords());
listsRouter.get("/listname/:fk_userid/:listname", getListRecords());
listsRouter.get("/", getListRecords());
listsRouter.delete("/delete/:fk_userid/:_id", deleteList());
listsRouter.put("/rename/:fk_userid/:_id/:newname", renameListName());

module.exports = listsRouter;
