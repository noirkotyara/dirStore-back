var express = require("express");

var requesterTypeMiddleware = require("../../middlewares/requester-type.middleware");
var authMiddleware = require("../../middlewares/auth.middleware");

var authController = require("../../controllers/auth");

var authRouter = express.Router();

authRouter.post(
  "/register",
  requesterTypeMiddleware,
  function (req, res, next) {
    authController.register(req.body, next);
  }
);

authRouter.post("/login", function (req, res, next) {
  authController.login(req.body, next);
});

authRouter.get(
  "/profile",
  authMiddleware.verifyToken,
  function (req, res, next) {
    authController.getUserProfile(req.user.userId, next);
  }
);

authRouter.put(
  "/profile",
  authMiddleware.verifyToken,
  function (req, res, next) {
    authController.updateUserProfile(req.user.userId, req.body, next);
  }
);

module.exports = authRouter;
