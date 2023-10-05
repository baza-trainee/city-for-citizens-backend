module.exports = (sequelize, Sequelize) => {
  const EventTypeRelationships = sequelize.define(
    "event_type_relationships",
    {},
    {
      timestamps: false,
    }
  );

  const EventAddress = sequelize.define(
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

  const EventTypes = sequelize.define(
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
      indexes: [
        {
          unique: true,
          fields: ["event_type", "locale"],
        },
      ],
    }
  );

  const Events = sequelize.define(
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
          model: EventAddress,
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


  return { EventAddress, EventTypes, Events, EventTypeRelationships };
};
