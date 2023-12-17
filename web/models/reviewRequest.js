"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class review_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  review_request.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: "id",
      },
      storeId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "store_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "email",
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "product_id",
      },
      isReviewed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_reviewed",
      },
      ratingStar: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "rating_star",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      paranoid: true,
      timestamps: true,
      deletedAt: "deleted_at",
      sequelize,
      modelName: "review_request",
    }
  );

  review_request.associate = function (models) {
    // associations can be defined here
  };

  return review_request;
};