/*
 * @Date: 2020-06-04 09:55:48
 * @LastEditors: jun
 * @LastEditTime: 2020-06-05 14:38:17
 * @FilePath: \vue-express\server\routes\demo.js
 */
var express = require('express');
var router = express.Router();
var db = require('../conf/db');
const sql = require('../until/sql');

const token = require('jsonwebtoken');
// console.log(token);

router.get('/', function (req, res, next) {
  // console.log(req.params);
  let params = req.query || req.param;
  let pageNum = parseInt(req.param('pageNum'));
  let pageSize = parseInt(req.param('pageSize'));
  let start = (pageNum - 1) * pageSize;
  let searchData = req.param('searchData');
  console.log('searchData',searchData);
  // console.log(start,pageNum, pageSize);
  db.query(`select count(*) as total from list where name like '%${searchData}%'`, [], (data) => {
    let total = data[0].total;
    // let sqlList = `select * from list limit ${start},${pageSize}`
    // let sqlList = `select * from list where name like '%${searchData}%'`
    let sqlList = `select * from list where name like '%${searchData}%' limit ${start},${pageSize}`
    console.log(sqlList);
    db.query(sqlList, [], function (data, err) {
      // console.log(results);
      res.json({
        data: data,
        status: 1,
        total: total
      })
    })
  })
})

//add
router.post('/add', (req, res) => {
  // console.log(req.query.name);
  let query = req.body;
  console.log(query);
  /* db.query(sql.insert, [param.id, param.name,param.name], (data, err) => {
    console.log(data);
    if(data){
      data = 'add'
    }
    res.json({
      data: data
    })
  }) */
  db.query('insert into list(name,age) values("' + query.name + '","' + query.age + '")', (data, err) => {
    console.log(data);
    res.json({
      data: '增加成功'
    })
  })
})

router.post('/delete', (req, res) => {
  let id = req.body.id;
  db.query('delete from list where id="' + id + '"', (result, err) => {
    // console.log(result);
    res.json({
      data: result
    })
  })
})

module.exports = router;