var seq = require("sequelize");

var seqConnection =
  require("../services/connectors/connect-db-sequelize").seqConnection;

var productModel = require("./product.model");
var delivererModel = require("./deliverer.model");

var providerModel = seqConnection.define(
  "Provider",
  {
    id: {
      type: seq.DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: seq.Sequelize.UUIDV4
    },
    productId: {
      type: seq.DataTypes.STRING(50),
      field: "product_id",
      require: true
    },
    delivererId: {
      type: seq.DataTypes.STRING(50),
      field: "deliverer_id",
      require: true
    },
    createdAt: {
      field: "created_date",
      type: seq.DataTypes.DATE
    },
    updatedAt: {
      field: "updated_date",
      type: seq.DataTypes.DATE
    }
  },
  {
    tableName: "Provider",
    timestamps: true,
    hooks: {}
  }
);

productModel.belongsToMany(delivererModel, {
  through: providerModel,
  foreignKeyConstraint: "FK_provider_product",
  as: "deliverers",
  foreignKey: "product_id"
});

delivererModel.belongsToMany(productModel, {
  through: providerModel,
  foreignKeyConstraint: "FK_Provider_Deliverer",
  as: "products",
  foreignKey: "deliverer_id"
});

providerModel.belongsTo(productModel, {
  foreignKey: "productId",
  as: "product"
});
providerModel.belongsTo(delivererModel, {
  foreignKey: "delivererId",
  as: "deliverer"
});

module.exports = providerModel;
