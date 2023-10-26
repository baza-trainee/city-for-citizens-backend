module.exports = (sequelize, Sequelize) => {
  const Tokens = sequelize.define(
    'tokens',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
    }
  );

  return { Tokens };
};
