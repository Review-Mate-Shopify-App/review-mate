"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class review_reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  review_reply.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      reply: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "reply",
      },
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'review_id'
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
      modelName: "review_reply",
    }
  );

  review_reply.associate = function (models) {
    // associations can be defined here
    review_reply.belongsTo(models.review_request, {
      foreignKey: 'reviewId',
      onDelete: 'CASCADE',
      as: 'review'
    });
    
  };

  return review_reply;
};