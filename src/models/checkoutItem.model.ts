import { DataTypes, ModelDefined, UUIDV4 } from "sequelize";

import { seqConnection } from "../services/connectors/connect-db-sequelize";

// @ts-ignore
import ProviderModel from "./provider.model";
import { CheckoutModel } from "./checkout.model";
import {
  CheckoutItemAttributes,
  CheckoutItemCreationAttributes,
} from "../types/CheckoutItem";

export const CheckoutItemModel: ModelDefined<
  CheckoutItemAttributes,
  CheckoutItemCreationAttributes
> = seqConnection.define(
  "Checkout_Item",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: UUIDV4,
    },
    providerId: {
      type: DataTypes.STRING(35),
      // references: { model: ProviderModel, key: "id" },
      field: "provider_id",
    },
    checkoutId: {
      type: DataTypes.STRING(35),
      // references: { model: CheckoutModel, key: "id" },
      field: "checkout_id",
    },
    createdAt: {
      field: "created_date",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_date",
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "Checkout_Item",
    timestamps: true,
  }
);

ProviderModel.belongsToMany(CheckoutModel, {
  through: CheckoutItemModel,
  as: "checkouts",
  foreignKey: "provider_id",
});

CheckoutModel.belongsToMany(ProviderModel, {
  through: CheckoutItemModel,
  as: "providers",
  foreignKey: "checkout_id",
});

CheckoutItemModel.belongsTo(CheckoutModel);
CheckoutItemModel.belongsTo(ProviderModel);

ProviderModel.hasMany(CheckoutItemModel);
CheckoutModel.hasMany(CheckoutItemModel);
