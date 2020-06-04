/*
 * @Date: 2020-05-25 13:29:11
 * @LastEditors: jun
 * @LastEditTime: 2020-05-25 13:33:22
 * @FilePath: \vue-express\server\conf\mysql.js
 */
/* module.exports = {
  mysql: {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "458677",
    database: "xm"
  }
}; */


const mysql = require("mysql");
var dbConfig = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "458677",
  database: "xm"
});

module.exports = dbConfig;