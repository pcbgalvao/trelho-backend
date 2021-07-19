const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../constants");

const authMiddlewares = {
  userAuthJWTMiddleware: function userAuthJWTMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          console.log("#####>>>>client will get a 403!!");
          return res.sendStatus(403);
        }

        req.user = user;
        next();
      });
    } else {
      console.log("#####>>>>client will get a 401!!");
      res.sendStatus(401);
    }
  },

  adminAuthJWTMiddleware: function adminAuthJWTMiddleware(req, res, next) {
    const { role } = req.user;

    if (role !== "admin") {
      return res.sendStatus(403);
    } else {
      next();
    }
  },
};

module.exports = authMiddlewares;