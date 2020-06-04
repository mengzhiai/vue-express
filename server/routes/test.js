/*
 * @Date: 2020-05-25 10:50:22
 * @LastEditors: jun
 * @LastEditTime: 2020-06-04 09:42:45
 * @FilePath: \vue-express\server\routes\test.js
 */ 
var express = require('express');
var router = express.Router();
const db = require('../conf/mysql')

/* GET users listing. */
router.get('/', function (req, res, next) {
  db.query("SELECT * FROM user", function (err, data) {
    if (err) {
      console.log("数据库访问出错", err);
    } else {
      res.send({
        data: data,
        status: 1
      })
    }
  })
  // res.send('respond with a resource');
});

module.exports = router;