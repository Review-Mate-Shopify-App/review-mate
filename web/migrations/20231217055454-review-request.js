"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("review_requests", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // Add auto-increment property
      },
      store_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_reviewed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      rating_star: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      rating_message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("review_requests");
  },
};