/*
 * @Date: 2020-05-26 13:51:36
 * @LastEditors: jun
 * @LastEditTime: 2020-05-26 17:09:52
 * @FilePath: \vue-express\src\views\test.js
 */

/* var express = require('express');
var app = express(); // the main app
var admin = express(); // the sub app
admin.get('/', function(req, res) {
    console.log(admin.mountpath); // /admin
    res.send('Admin Homepage');
});
app.use('/admin', admin); // mount the sub app
app.listen(4000); */


/* var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('hello world!');
});

app.listen(4000); */



/* const expree = require('express');
const app = expree();

const https = require('https');
const http = require('http');
app.get('/test/:id', (req,res, next)=>{
  res.send('test');
  next();
})

// app.listen(4000)

http.createServer(app).listen(4000) */


var express = require('express');
var app = express();
app.param(function(param, option){
    return function(req, res, next, val) {
        if (val == option) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
});
app.param('id', 1337);
app.get('/user/:id', function(req, res) {
    res.send('Ok');
});
app.listen(4000, function() {
    console.log('Ready');
}); 