const express = require("express");
const router = express.Router();
const boardMethods = require("../mongo/boardMethods");

router.get("/board", (req, res) =>
  res.send({ data: boardMethods.board(boardId) })
);

router.post("/board/create", (req, res) =>{
  const body = req.body;
  // res.send(req.body)
  res.send({ data: boardMethods.boardCreate(body) })
});

router.delete("/board/remove", (req, res) => res.send({}));

router.put("/board/addList", (req, res) =>
  res.send({ data: boardMethods.addList(req.list) })
);

router.put("/board/changeVisibility", (req, res) =>
  res.send({ data: boardMethods.boardChangeVisibility(req.newVisibility) })
);

router.put("/board/rename", (req, res) =>
  res.send({ data: boardMethods.boardRename(newName) })

);

module.exports = router;