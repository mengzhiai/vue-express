/*
 * @Date: 2020-05-25 10:50:22
 * @LastEditors: jun
 * @LastEditTime: 2020-06-04 15:53:35
 * @FilePath: \vue-express\server\routes\login.js
 */
var express = require('express');
var router = express.Router();
var db = require('../conf/db');

const jwt = require('jsonwebtoken');


/* GET users listing. */
router.get('/', function (req, res, next) {
  const token = 'Bearer ' + jwt.sign(
    {
      _id: user._id,
      admin: user.role === 'admin'
    },
    'secret12345',
    {
      expiresIn: 3600 * 24 * 3
    }
  )
  console.log(token);
  db.query('select * from list', [], (data) => {
    res.json({
      data: data,
      token: token
    })
  })
});

module.exports = router;