const express = require("express");
const jwt = require("jsonwebtoken");
const checklistsRouter = express.Router();
const dbChecklists = require("../mongo/dbChecklistsMethods");
const { ACCESS_TOKEN_SECRET } = require("../constants");

const createChecklistHandler = async (req, res) => {
  const checklistsForm = req.body;
  const newChecklists = await dbChecklists.create(checklistsForm);
  const resultSentChecklists = await res
    .status(200)
    .send({ ...newChecklists })
    .end();
  return resultSentChecklists;
};

const getChecklistsHandler = async (req, res) => {
  const checklistsFindFields =
    Object.keys(req.params).length > 0 ? req.params : req.query;
  const checklistsList = await dbChecklists.getChecklists(checklistsFindFields);
  const resultChecklistsSent = await res
    .status(200)
    .send([...checklistsList])
    .end();
  return resultChecklistsSent;
};

const deleteChecklistsHandler = async (req, res) => {
  const _id = req.params._id;
  const resultDelete = await dbChecklists.deleteChecklist(_id);
  const resultDeleteSent = await res.status(200).send({ resultDelete }).end();

  return resultDeleteSent;
};

const insertItemHandler = async (req, res) => {
  const newItem = req.body;
  const resultInsert = await dbChecklists.insertItem(newItem);
  const resultInsertSent = await res.status(200).send({ resultInsert }).end();

  return resultInsertSent;
};

const updateItemHandler = async (req, res) => {
  const _id = req.params._id;
  const resultUpdate = await dbChecklists.update(_id);
  const resultUpdateSent = await res.status(200).send({ resultUpdate }).end();

  return resultUpdateSent;
};

checklistsRouter.post("/create", createChecklistHandler);
checklistsRouter.get("/list/:fk_userid", getChecklistsHandler);
checklistsRouter.get("/list/:fk_userid/:fk_cardid", getChecklistsHandler);

module.exports = checklistsRouter;
