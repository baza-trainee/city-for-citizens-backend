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
      // Define hooks
      // hooks: {
      //   // Hook before creating a new record
      //   beforeCreate: (instance, options) => {
      //     const currentDate = new Date();
      //     currentDate.setUTCHours(currentDate.getUTCHours() + 2); // Add 2 hours
      //     instance.createdAt = currentDate;
      //     instance.updatedAt = currentDate;
      //   },
      //   // Hook before updating an existing record
      //   beforeUpdate: (instance, options) => {
      //     const currentDate = new Date();
      //     currentDate.setUTCHours(currentDate.getUTCHours() + 2); // Add 2 hours
      //     instance.updatedAt = currentDate;
      //   },
      // },
    }
  );

  return { Partners };
};
