require('dotenv').config()

const config = { db: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASW,
    database: process.env.MYSQL_DB,
    connectTimeout: 60000,
  },
};
module.exports = config;