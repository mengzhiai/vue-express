/*
 * @Date: 2020-05-21 14:19:06
 * @LastEditors: jun
 * @LastEditTime: 2020-06-05 17:14:48
 * @FilePath: \vue-express\server\app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入json解析中间件
var bodyParser = require('body-parser');
//引入express-session
var session = require('express-session');

//引入 jwt
const expressJWT = require('express-jwt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var demoRouter = require('./routes/demo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//使用bodyParser
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: true }));


// 使用 session 中间件
app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));

// 用户登录
app.post('/login', function(req, res){
  if(req.body.username == 'admin' && req.body.pwd == 'admin123'){
      req.session.userName = req.body.username; // 登录成功，设置 session
      // res.redirect('/');
      console.log(req.session.userName);
      res.json({
        message: '登录成功'
      })
  }
  else{
      res.json({ret_code : 1, ret_msg : '账号或密码错误'});// 若登录失败，重定向到登录页面
  }
});


// 获取主页
app.get('/', function (req, res) {
  console.log('userName',req.session.userName);
  if(req.session.userName){  //判断session 状态，如果有效，则返回主页，否则转到登录页面
      // res.render('home',{username : req.session.userName});
      res.json({
        data: '我是测试'
      })
  }else{
      res.redirect('login');
  }
})

 



/* app.use(expressJWT({
  secret: 'secret12345'  // 签名的密钥 或 PublicKey
}).unless({
  path: ['/login']  // 指定路径不经过 Token 解析
})) */


//解决跨域
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
      res.send(200);
  } else {
      next();
  }
});
// 自定义跨域中间件
var allowCors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCors); //使用跨域中间件


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/demo', demoRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
