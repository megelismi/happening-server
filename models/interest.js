'use strict';

module.exports = (sequelize, DataTypes) => {
    const Interest = sequelize.define('Interest', {
        id:  DataTypes.NUMBER,
        interest: DataTypes.STRING,
        userIds:  {
            type: DataTypes.ARRAY,
            defaultValue: null
        }
    }, {});
    Interest.associate = function(models) {
        // associations can be defined here
    };
    return Interest;
};