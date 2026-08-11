const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is required",
    });
  }

  const authorizationParts = authorization.split(" ");
  const [scheme, token] = authorizationParts;

  if (authorizationParts.length !== 2 || scheme !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token format",
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: "Authentication is temporarily unavailable",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token",
      });
    }

    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};

module.exports = auth;
