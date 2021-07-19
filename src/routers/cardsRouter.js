const express = require("express");
const jwt = require("jsonwebtoken");
const cardsRouter = express.Router();
const dbCards = require("../mongo/dbCardsMethods");
const { ACCESS_TOKEN_SECRET } = require("../constants");

const createCardHandler = async (req, res) => {
  const cardForm = req.body;
  const newCard = await dbCards.createCard(cardForm);
  const resultSentCard = await res
    .status(200)
    .send({ ...newCard })
    .end();
  return resultSentCard;
};

const getCardsListHandler = async (req, res) => {
  const cardsFindFields =
    
  Object.keys(req.params).length > 0 ? req.params : req.query;
  const cardsList = await dbCards.getCardsList(cardsFindFields);
  const resultCardsSent = await res
    .status(200)
    .send([...cardsList])
    .end();
  return resultCardsSent;
};

const deleteCardHandler = async (req, res) => {
  const _id = req.params._id;
  const resultDelete = await dbCards.deleteCard(_id);
  const resultDeleteSent = await res.status(200).send({ resultDelete }).end();

  return resultDeleteSent;
};

const renameFieldCarddHandler = async (req, res) => {
  const renameCardsField = req.params;
  const resultUpdate = await dbCards.renameFieldCard(renameCardsField);
  const resultSent = await res.status(200).send({ resultUpdate }).end();

  return resultSent;
};

cardsRouter.post("/create", createCardHandler);
cardsRouter.get("/list/:fk_userid/:fk_listid", getCardsListHandler);
cardsRouter.get("/list/:fk_userid/", getCardsListHandler);
cardsRouter.delete("/delete/:fk_iduser/:_id", deleteCardHandler);
cardsRouter.put("/rename/:fk_iduser/:_id/:field/:newvalue", renameFieldCarddHandler);

module.exports = cardsRouter;
