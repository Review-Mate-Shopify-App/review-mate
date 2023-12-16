"use strict";

module.exports = {
  reviewRequest: (sequelize, DataTypes) => {
    const reviewRequest = sequelize.define("reviewRequest", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        field: "id",
      },
      storeId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "store_id",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "name",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "email",
      },
      productId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "product_id",
      },
      isReviewed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_reviewed",
      },
      ratingStar: {
        type: Sequelize.INTEGER,
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
  },
};
