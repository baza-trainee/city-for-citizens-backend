module.exports = (sequelize, Sequelize) => {
  const EventTypeRelationships = sequelize.define(
    'eventType_relationships',
    {},
    {
      timestamps: false,
    }
  );

  const EventAddress = sequelize.define(
    'event_address',
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
      eventTitle: {
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
      eventUrl: {
        type: Sequelize.STRING(255),
      },
      eventImage: {
        type: Sequelize.STRING(255),
      },
      event_address_id: {
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
          fields: ['date_time', 'event_address_id', 'locale'],
        },
      ],
    }
  );

  return { EventAddress, EventTypes, Events, EventTypeRelationships };
};
