"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutItems = void 0;
var checkout_item_model_1 = require("@models/checkout-item.model");
var get_provider_by_id_1 = require("@services/provider/get-provider-by-id");
var product_model_1 = __importDefault(require("@models/product.model"));
var createCheckoutItems = function (checkoutId, providersIds) { return __awaiter(void 0, void 0, void 0, function () {
    var checkoutItems, createdCheckoutItems, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Promise.all(providersIds.map(function (providerId) { return __awaiter(void 0, void 0, void 0, function () {
                        var providerInfo, productId;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, get_provider_by_id_1.getProviderById)(providerId)];
                                case 1:
                                    providerInfo = _a.sent();
                                    if (!providerInfo) {
                                        throw new Error("Provider is not founded");
                                    }
                                    productId = providerInfo.productId;
                                    return [2 /*return*/, product_model_1.default.increment({ amount: -1 }, { where: { id: productId } })];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                checkoutItems = providersIds.map(function (providerId) {
                    return { checkoutId: checkoutId, providerId: providerId };
                });
                return [4 /*yield*/, checkout_item_model_1.CheckoutItemModel.bulkCreate(checkoutItems)];
            case 2:
                createdCheckoutItems = _a.sent();
                return [2 /*return*/, createdCheckoutItems.length === 0
                        ? null
                        : createdCheckoutItems.map(function (item) { return item.get(); })];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createCheckoutItems = createCheckoutItems;
