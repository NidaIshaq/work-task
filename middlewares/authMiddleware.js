const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      return res.status(401).send({
        message: "Authorization header missing",
        success: false,
      });
    }

    const tokenParts = authorizationHeader.split(" ");
    if (tokenParts.length !== 2) {
      return res.status(401).send({
        message: "Token format is incorrect",
        success: false,
      });
    }

    const token = tokenParts[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};

