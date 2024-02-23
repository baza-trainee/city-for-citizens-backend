module.exports = (sequelize, Sequelize) => {
  const Partners = sequelize.define(
    'partners',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: 'name is required' },
        },
      },
      link: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: 'image is required' },
        },
      },
    },
    {
      timestamps: true,
    }
  );

  return { Partners };
};
