const express = require("express");
const router = express.Router();
const dbUserMethods = require("../mongo/dbUserMethods");
const authMiddlewares = require("./authMiddlewares");

// ##
// ### Handler Route Methods
// ##

const listsAllUsersHandler = () => async (req, res) => {
  res.send({ data: await dbUserMethods.getRegisteredUsers() });
};

const getUserHandler = () => async (req, res) => {
  const userLogin = req.params;
  console.log("router-usersGetloginData - userLogin", userLogin);
  res.send({ data: await dbUserMethods.getUserDB(userLogin) });
};

const registerUserHandler = () => async (req, res) => {
  const userForm = req.body;
  console.log("registerUserHandler - userForm-", userForm);
  const data = await dbUserMethods.createUser(userForm);
  const result = res.send({ data });
  console.log("registerUserHandler - result-", result);

  return result;
};

//##
//## Routes
//##

router.get(
  "/getlogin/:userlogin",
  authMiddlewares.userAuthJWTMiddleware,
  getUserHandler()
);
router.get(
  "/listall",
  authMiddlewares.userAuthJWTMiddleware,
  authMiddlewares.adminAuthJWTMiddleware,
  listsAllUsersHandler()
);
router.post(
  "/register",
  registerUserHandler
);

module.exports = router;
