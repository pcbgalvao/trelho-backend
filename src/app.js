const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const winstonMiddlwares = require("./winston/winstonConfig");

const DbConnection = require("./mongo/DbConnection");
DbConnection.init();

const cardsdRouter = require("./routers/cardsRouter");
const checklistsRouter = require("./routers/checklistsRouter");
const checklistItemsRouter = require("./routers/checklistItemsRouter");

//const usersRouter = require("./routers/usersRouter");
//const authRouter = require("./routers/authRouter");
const listsRouter = require("./routers/listsRouter");

const app = express();

// Before Middlewares
//
app.use(cors());

// Setting up bodyParser to use json and set it to req.body

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(winstonMiddlwares.HttpLogger);

// App Routes Middlewares
//app.use("/", boardRouter);
//app.use("/auth", authRouter);
app.use("/lists", listsRouter);
//app.use("/users", usersRouter);

app.use("/cards", cardsdRouter);
app.use("/checklists", checklistsRouter);
app.use("/items", checklistItemsRouter);

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

//app.use("/card", cardRouter);

function shutdownServer(code) {
  console.log("Exits with code ", code);
  DbConnection.close();
}

process.on("exit", (code) => shutdownServer(code));
// This will handle kill commands, such as CTRL+C:
process.on("uncaughtException", shutdownServer);

module.exports = app;
