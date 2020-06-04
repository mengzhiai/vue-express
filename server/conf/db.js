/*
 * @Date: 2020-06-04 09:43:44
 * @LastEditors: jun
 * @LastEditTime: 2020-06-04 10:04:02
 * @FilePath: \vue-express\server\conf\db.js
 */

const mysql = require('mysql');

const dbConfig = require('./db.config');

module.exports = {
  query: function (sql, params, callback) {
    //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
    const connection = mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "458677",
      database: "xm"
    });
    connection.connect(function (err) {
      if (err) {
        console.log('数据库连接失败');
        throw err
      }
    })

    //数据操作
    connection.query(sql, params, function (err, results, fileds) {
      if (err) {
        console.log('数据操作失败');
        throw err;
      }
      //将查询出来的数据返回给回调函数
      callback && callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fileds)));

      //停止链接数据库
      connection.end(function (err) {
        if (err) {
          console.log('关闭数据库连接失败');
          throw err;
        }
      })
    })



  }
}

