const { createConnection } = require('mysql-await');
const { config } = require('dotenv');
config();
const conexion = createConnection({
  connectionLimit: 10,
  database: process.env.DATABASE,
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
});

module.exports = conexion;
