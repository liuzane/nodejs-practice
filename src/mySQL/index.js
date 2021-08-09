const mysql = require('mysql');
const database = require('./database.json');

const SELECT = (sql, callback) => {
  const connection = mysql.createConnection(database);
  connection.connect();
  connection.query(sql, function (error, result, fields) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      return;
    }
    callback(result);
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
  });
  connection.end();
};

const UPDATE = (sql, callback) => {
  const connection = mysql.createConnection(database);
  connection.connect();
  connection.query(sql, function (error, result, fields) {
    if (error) {
      console.log('[UPDATE ERROR] - ', error.message);
      return;
    }
    callback(result);
    console.log('--------------------------UPDATE----------------------------');
    console.log(result);
    console.log(fields);
    console.log('------------------------------------------------------------\n\n');
  });
  connection.end();
};

module.exports = {
  SELECT,
  UPDATE,
};