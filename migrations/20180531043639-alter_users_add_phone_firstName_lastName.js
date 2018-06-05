'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.addColumn(
          'Users',
          'firstName',
          Sequelize.STRING
      );

      queryInterface.addColumn(
          'Users',
          'lastName',
          Sequelize.STRING
      );

      queryInterface.addColumn(
          'Users',
          'phone',
          {
              type: Sequelize.STRING,
              allowNull: false
          }
      );
  },

  down: queryInterface => {
      queryInterface.removeColumn('Users', 'firstName');

      queryInterface.removeColumn('Users', 'lastName');

      queryInterface.removeColumn('Users', 'phone');
  }
};
