const express = require("express");
const jwt = require("jsonwebtoken");
const cardsRouter = express.Router();
const dbCardsMethods = require("../mongo/cardsMethods");
const { ACCESS_TOKEN_SECRET } = require("../constants");

const getCardsListHandler = async (req, res) => {
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

cardsRouter.get("/list", getCardsListHandler);
cardsRouter.delete("/delete/:id", deleteCardIdHandler);
cardsRouter.put("/rename/:id", renameCardTitleHandler);
cardsRouter.post("/create", createCardHandler);

module.exports = cardsRouter;
