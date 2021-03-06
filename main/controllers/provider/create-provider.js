var ff = require("ff");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");

var providerService = require("../../services/provider/provider.service");
var delivererService = require("../../services/deliverer/deliverer.service");
var productService = require("../../services/product/product.service");

var createProvider = function(providerInfo, next) {
  var f = ff(
    this,
    checkDelivererAndProductExistence,
    checkAndCreateProvider,
    checkProviderCreate
  ).onComplete(onCompleteHandler);

  function checkDelivererAndProductExistence() {
    delivererService.getDelivererById(providerInfo.delivererId, f.slotPlain(2));
    productService.isProductExist(providerInfo.productId, f.slotPlain(2));
  }

  function checkAndCreateProvider(
    errorDeliverer,
    deliverer,
    errorProduct,
    product
  ) {
    if (errorDeliverer || errorProduct) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        message: errorDeliverer || errorProduct
      });
    }
    if (myLodash.isEmpty(deliverer)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message:
          "Deliverer with id: " + providerInfo.delivererId + " is not existed"
      });
    }
    if (myLodash.isEmpty(product)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message:
          "Product with id: " + providerInfo.productId + " is not existed"
      });
    }
    providerService.createProvider(providerInfo, f.slotPlain(1));
  }

  function checkProviderCreate(error) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        message: error
      });
    }
  }

  function onCompleteHandler(error) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.BASIC_SUCCESS__CREATED,
      message: "Provider is created successfully"
    });
  }
};

module.exports = createProvider;
