const mysql = require('mysql');
const { promisify }= require('util');
const { database } = require('./config');
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error(`Database connection was closed.`.red);
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error(`Database has to many connections`.red);
    }
    if (err.code === 'ECONNREFUSED') {
      console.error(`Database connection was refused`.red);
    }
  }

  if (connection) connection.release();
  console.log(`La DB esta conectada`.green); 
  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;