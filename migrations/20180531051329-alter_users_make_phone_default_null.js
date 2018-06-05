'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.changeColumn(
          'Users',
          'phone',
          {
              type: Sequelize.STRING,
              allowNull: true
          }
      )
  },

  down: (queryInterface, Sequelize) => {
      queryInterface.changeColumn(
          'Users',
          'phone',
          {
              type: Sequelize.STRING,
              allowNull: false
          }
      )
  }
};
