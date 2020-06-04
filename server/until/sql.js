/*
 * @Date: 2020-06-04 10:18:39
 * @LastEditors: jun
 * @LastEditTime: 2020-06-04 13:46:40
 * @FilePath: \vue-express\server\until\sql.js
 */ 


 exports.userList = 'select * from list'

 exports.insert = 'insert into list(id, name, age) values(?,?,?)'

 exports.delete = 'delete from list where id=?'