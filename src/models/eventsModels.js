module.exports = (sequelize, Sequelize) => {
  const EventTypeRelationships = sequelize.define(
    'eventTypeRelationships',
    {},
    {
      timestamps: false,
    }
  );

  const EventAddress = sequelize.define(
    'eventAddress',
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
    'eventTypes',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      eventType: {
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
          fields: ['eventType', 'locale'],
        },
      ],
    }
  );

  const Events = sequelize.define(
    'events',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idIdentifier: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      eventTitle: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      dateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      eventUrl: {
        type: Sequelize.STRING(255),
      },
      eventImage: {
        type: Sequelize.STRING(255),
      },
      eventAddressId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: EventAddress,
          key: 'id',
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
          fields: ['dateTime', 'eventAddressId', 'locale'],
        },
      ],
    }
  );

  return { EventAddress, EventTypes, Events, EventTypeRelationships };
};
