const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dbUserMethods = require("../mongo/dbUserMethods");
const { ACCESS_TOKEN_SECRET } = require("../constants");

const authLoginHandler = async (req, res) => {
  let errorCode = 0;
  let accessToken = null;

  const validCredentials = (userCredentials, userDBCredentials) => {
    return userCredentials.password === userDBCredentials.password;
  };

  const userCredentials = req.body;
  console.log("router-login - userCredentials", userCredentials);
  let userDBCredentials = await dbUserMethods.getUserDB(userCredentials);
  console.log("router-login - userDBCredentials", userDBCredentials);

  // ## User is registered and credentials given are valid
  if (
    userDBCredentials &&
    validCredentials(userCredentials, userDBCredentials)
  ) {
    accessToken = jwt.sign(
      {
        username: userDBCredentials.username,
        role: userDBCredentials.role,
      },      
      ACCESS_TOKEN_SECRET
    );
  } else {
    errorCode = -1;
  }

  if (!errorCode) {
    res.json({ accessToken, userDBCredentials, errorCode });
  } else {
    res.json({ errorCode });
  }
};

router.post("/login", authLoginHandler);

module.exports = router;
