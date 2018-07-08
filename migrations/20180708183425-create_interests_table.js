'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Interests', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          userIds: {
              type: Sequelize.STRING
          },
          interest: {
              type: Sequelize.STRING,
              allowNull: true,
              defaultValue: null,
              get() {
                  return this.getDataValue('interests').split(';')
              },
              set(val) {
                  this.setDataValue('interests', val.join(';'));
              },
          }
      });
  },

  down: (queryInterface) => {
      return queryInterface.dropTable('Interests');
  }
};
