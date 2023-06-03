'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Test', 'age', {
      type: Sequelize.DataTypes.SMALLINT,
      allowNull: true,
    });

    await queryInterface.addColumn('Test', 'description', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Test', 'comments', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('age');
    queryInterface.removeColumn('description');
    queryInterface.removeColumn('comments');
  },
};
