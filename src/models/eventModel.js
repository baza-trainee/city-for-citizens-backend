const Sequelize = require("sequelize");
module.exports = function (sequelize, eventAddressModel) {
  return sequelize.define(
    "events",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      event_title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      date_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      event_url: {
        type: Sequelize.STRING(255),
      },
      event_image: {
        type: Sequelize.STRING(255),
      },
      event_address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: eventAddressModel,
          key: "id",
        },
      },
      locale: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["date_time", "event_address_id", "locale"],
        },
      ],
    }
  );
};
