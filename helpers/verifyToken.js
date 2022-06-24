const JWT = require("jsonwebtoken");

const middleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;

    if (token) {
      const accessToken = token.split(" ")[1];
      JWT.verify(accessToken, "ApiManga", (err, user) => {
        if (err) {
          return res.status(403).json({
            message: "Token is not valid",
          });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({
        message: "Please to login",
      });
    }
  },
};
module.exports = middleware;
