/*
 * @Date: 2020-06-04 09:55:48
 * @LastEditors: jun
 * @LastEditTime: 2020-06-04 15:06:18
 * @FilePath: \vue-express\server\routes\demo.js
 */
var express = require('express');
var router = express.Router();
var db = require('../conf/db');
const sql = require('../until/sql');

router.get('/', function (req, res, next) {
  // console.log(req.params);
  let params = req.query || req.param;
  let pageNum = parseInt(req.param('pageNum'));
  let pageSize = parseInt(req.param('pageSize'));
  let start = (pageNum - 1) * pageSize;
  console.log(start,pageNum, pageSize);
  db.query('select count(*) as total from list', [], (data) => {
    let total = data[0].total;
    let sqlList = `select * from list limit ${start},${pageSize}`
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