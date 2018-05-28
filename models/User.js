import Sequelize from 'sequelize';
import { sequelize } from '../server';

const User = sequelize.define('user', {
    firstName: {
        type:      Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type:      Sequelize.STRING,
        allowNull: false
    },
    password: {
        type:      Sequelize.STRING
    }
});

User.sync({ force: true }).then(() => {
    console.log('User model synced');
});