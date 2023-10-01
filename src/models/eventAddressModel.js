const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "event_address",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      city: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING(255),
      },
      notes: {
        type: Sequelize.TEXT,
      },
      coordinates: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      locale: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
