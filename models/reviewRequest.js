"use strict";

module.exports = (sequelize, DataTypes) => {
  const reviewRequest = sequelize.define('reviewRequest', {
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
  });
  return reviewRequest;
};
