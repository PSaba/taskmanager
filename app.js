var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var model = require('./models/index');

var index = require('./routes/index');
var users = require('./routes/users');
var tasks = require('./routes/tasks');
var groups = require('./routes/groups');

var app = express();

var session1 = require('./session');
//check user session
app.use(
session(session1));

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    var params = {
      handle: req.session.user.handle
    }
    model.sequelize.query('SELECT * FROM "Users" WHERE handle LIKE $handle', {bind: params, type: model.sequelize.QueryTypes.SELECT})
   .then((results) => {
     try{
       req.user = results[0];
        req.session.user = results[0];
        delete req.user.password; // delete the password from the session
        req.session.user = results[0];  //refresh the session value
        res.locals.user = results[0];
     } catch (err ){
      console.log("Not in session");
     }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/users/tasks', tasks);
app.use('/groups', groups);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
