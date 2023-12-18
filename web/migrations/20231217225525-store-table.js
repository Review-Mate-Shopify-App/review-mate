module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("store_data", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      storeName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "store_name",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accessToken: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "access_token",
      },
      isAppInstall: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_app_install",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: "deleted_at",
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("stores");
  },
};
