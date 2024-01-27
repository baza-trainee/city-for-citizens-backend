module.exports = (sequelize, Sequelize) => {
  const Documents = sequelize.define(
    'documents',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      file: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return { Documents };
};
