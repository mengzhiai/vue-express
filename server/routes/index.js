/*
 * @Date: 2020-05-21 14:19:06
 * @LastEditors: jun
 * @LastEditTime: 2020-05-25 17:14:04
 * @FilePath: \vue-express\server\routes\index.js
 */ 
var express = require('express');
var router = express.Router();
const mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "458677",
  database: "xm"
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  db.query("SELECT * FROM user", function (err, data) {
    if (err) {
      console.log("数据库访问出错", err);
    } else {
      console.log(data);
    }
  })
  res.send('respond with a');
});

module.exports = router;
