const express = require("express");
const jwt = require("jsonwebtoken");
const cardsCheckListsRouter = express.Router();
const dbCardsMethods = require("../mongo/cardsMethods");
const { ACCESS_TOKEN_SECRET } = require("../constants");

const getCardsCheckListsHandler = async (req, res) => {
    dbCardsMethods.getCardsList;
  };
  
const deleteCardIdHandler = async (req, res) => {
  dbCardsMethods.deleteCardId;
};

const renameCardTitleHandler = async (req, res) => {
  dbCardsMethods.renameCardTitle;
};

const createCardHandler = async (req, res) => {
  const cardForm = req.body;
  const newCard = await dbCardsMethods.createCard(cardForm);
  const resultSendCard = res.send({newCard});

  return resultSendCard;
};

cardsCheckListsRouter.get("/list", getCardsListHandler);
cardsCheckListsRouter.delete("/delete/:id", deleteCardIdHandler);
cardsCheckListsRouter.put("/rename/:id", renameCardTitleHandler);
cardsCheckListsRouter.post("/create", createCardHandler);

module.exports = cardsCheckListsRouter;
