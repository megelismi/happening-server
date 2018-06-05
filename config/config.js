require('dotenv').load();

module.exports = {
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.DATABASE_HOSTNAME,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": process.env.DATABASE_HOSTNAME,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": process.env.DATABASE_HOSTNAME,
    "dialect": "mysql"
  }
};
