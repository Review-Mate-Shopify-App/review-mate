const { username, database, password, db_port, host } = require("./default");

module.exports = {
  development: {
    username: 'postgres',
    database: 'review_mate',
    password: '1972',
    port: db_port,
    host: host,
    dialect: "postgres",
    logging: false,
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },
  production: {
    username: username,
    database: database,
    password: password,
    port: db_port,
    host: host,
    dialect: "postgres",
    logging: false,
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },
  test: {
    username: username,
    database: database,
    password: password,
    port: db_port,
    host: host,
    dialect: "postgres",
    logging: false,
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },
};