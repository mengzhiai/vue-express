/*
 * @Date: 2020-06-05 10:45:30
 * @LastEditors: jun
 * @LastEditTime: 2020-06-05 10:47:22
 * @FilePath: \vue-express\server\routes\txt.js
 */ 
var express = require('express');
var router = express.Router();
const db=require('../model/mysql.js');
 
/**
 * 带分页和模糊查询的方法
 * */
router.get('/table',(req,res) => {
    //模糊查询的sql  SELECT * FROM  bloginformation WHERE blogTitle LIKE ? OR blogContent LIKE ? OR blogLable LIKE ?
    var params = req.query || req.params;
    let sql = "SELECT * FROM `table`";   //查询列表所有的数据
    let content = [];
    let isMore = false;//是否有多个查询参数
    if(params.name){
        // 模糊查询两种方法直接在SQL语句后加 mysql.escape("%"+req.body.name+"%")
        // sql += " WHERE product_name LIKE "+mysql.escape("%"+req.body.name+"%")
        sql += " WHERE name LIKE ?";
        content.push( "%"+params.name+"%" );
        isMore = true;
    }
    if(params.age){
        if(isMore){//true代表有多个参数
            sql += "and age like ?";//and是两个条件都必须满足，or是或的关系
        }else{
            sql += " WHERE age LIKE ?";
        }
        content.push( "%"+params.age+"%" );
    }
    if(params.page || params.page_size){//开启分页
        let current = params.page;//当前页码
        let pageSize = params.page_size;//一页展示多少条数据
        sql += " limit ?,?";
        content.push((current-1)*pageSize,parseInt(pageSize));
    }
 
    db.query(sql, content,function(result,fields){
        res.json({
            status:200,
            message:result
        })
    });
 
 
 
})
 
 
 
module.exports = router;
