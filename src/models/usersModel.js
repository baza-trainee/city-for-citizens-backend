module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    'users',
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
      email: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: 'email is required' },
        },
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: 'password is required' },
        },
      },
      activationLink: {
        type: Sequelize.STRING(255),
      },
      isActivated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return { Users };
};
