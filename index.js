
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

const winstonMiddlwares = require("./winston/winstonConfig");

const { API_PORT } = require("./constants");
const cardsdRouter = require("./routers/cardsRouter");
const usersRouter = require("./routers/usersRouter");
const authRouter = require("./routers/authRouter");

const app = express();

// Before Middlewares
//
app.use(cors());

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(winstonMiddlwares.HttpLogger);

// App Routes Middlewares
//app.use("/", boardRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/cards", cardsdRouter);

// After Middlewares
app.use(winstonMiddlwares.ErrorLogger);

// const listRouter = require("./routers/listRouter");
// const cardRouter = require("./routers/cardRouter");

//app.post("/board/create", (req, res) =>
//  res.send({ data: boardMethods.boardCreate(name) })
//);
//app.get("/board", (req, res) =>
//  res.send({ data: boardMethods.board(boardId) })
//);

//app.use("/list", listRouter);
//app.use("/card", cardRouter);

const PORT = process.env.PORT || API_PORT;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} port`);
});
