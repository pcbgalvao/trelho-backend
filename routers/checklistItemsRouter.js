const express = require("express");
const jwt = require("jsonwebtoken");
const checklistItemsRouter = express.Router();
const dbChecklistsItems = require("../mongo/dbChecklistsItemsMethods");
const { ACCESS_TOKEN_SECRET } = require("../constants");

const createItemHandler = async (req, res) => {
  const itemForm = req.body;
  const newItem = await dbChecklistsItems.createItem(itemForm);
  const resultSent = await res
    .status(200)
    .send({ ...newItem })
    .end();
  return resultSent;
};

const getItemsHandler = async (req, res) => {
  const itemsFindFields =
    Object.keys(req.params).length > 0 ? req.params : req.query;
  const itemsList = await dbChecklistsItems.getItems(itemsFindFields);
  const resultSent = await res
    .status(200)
    .send([...itemsList])
    .end();
  return resultSent;
};

const deleteChecklistsHandler = async (req, res) => {
  const _id = req.params._id;
  const resultDelete = await dbChecklistsItems.deleteChecklist(_id);
  const resultDeleteSent = await res.status(200).send({ resultDelete }).end();

  return resultDeleteSent;
};

const insertItemHandler = async (req, res) => {
  const newItem = req.body;
  const resultInsert = await dbChecklistsItems.insertItem(newItem);
  const resultInsertSent = await res.status(200).send({ resultInsert }).end();

  return resultInsertSent;
};

const updateItemHandler = async (req, res) => {
  const _id = req.params._id;
  const resultUpdate = await dbChecklistsItems.update(_id);
  const resultUpdateSent = await res.status(200).send({ resultUpdate }).end();

  return resultUpdateSent;
};

checklistItemsRouter.post("/create", createItemHandler);
checklistItemsRouter.get("/list/:fk_iduser/:fk_checklistid", getItemsHandler);
checklistItemsRouter.put("/update", updateItemHandler);

module.exports = checklistItemsRouter;
