var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var busboy = require('connect-busboy');
var helmet = require('helmet');
var config = require('./config');
var cors = require('cors');


var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var adminRouter = require('./routes/admin');

// Initialize Express
var app = express();
app.use(helmet({
  contentSecurityPolicy: config.cspConfig,
  referrerPolicy: { policy: "origin" },
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(busboy());
app.use(logger('dev'));
app.use(express.json({limit:1024*1024*10, type:'application/json'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(config.allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not '
                + 'allow access from the specified Origin.' + origin;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.message)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
