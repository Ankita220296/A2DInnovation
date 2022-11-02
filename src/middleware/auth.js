const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authentication = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"] || req.headers["x-Api-key"];
    if (!token)
      return res
        .status(400)
        .send({ status: false, msg: "Token must be present" });

    jwt.verify(token, process.env.JWT_TOKEN, (error, response) => {
      if (error) {
        const msg =
          error.message === "jwt expired"
            ? "Token is expired"
            : "Token is invalid";
        return res.status(401).send({ status: false, msg });
      }
      req.headers["authorId"] = response.authorId;
      next();
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { Authentication };