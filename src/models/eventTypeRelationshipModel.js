const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "event_type_relationships",
    {
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "events",
          key: "id",
        },
      },
      event_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "event_types",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
