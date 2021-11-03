var express = require("express");
var router = express.Router();

var authController = require("../controllers/auth/auth.controller");
var providerController = require("../controllers/provider/provider.controller");

var authMiddleware = require("./../middlewares/auth.middleware");
var requesterTypeMiddleware = require("./../middlewares/requesterType.middleware");

router.post("/login", requesterTypeMiddleware, function (req, res, next) {
  authController.login(req.body, next);
});

router.post("/provider", authMiddleware.verifyToken, function (req, res, next) {
  providerController.createProvider(req.body, next);
});

module.exports = router;