module.exports = (sequelize, Sequelize) => {
  const Contacts = sequelize.define(
    'contacts',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstPhone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      secondPhone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return { Contacts };
};
