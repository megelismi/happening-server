'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    password:  DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName:  DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      defaultValue: 0
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};