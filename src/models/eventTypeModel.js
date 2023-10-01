const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "event_types",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      event_type: {
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
