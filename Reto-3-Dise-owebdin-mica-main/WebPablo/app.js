var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// SESIÓN
app.use(
  session({
    secret: 'mi-secreto-super-seguro',
    resave: false,
    saveUninitialized: false
  })
);

// hacer disponible el usuario en las vistas
app.use(function (req, res, next) {
  res.locals.user = req.session.user || null;
  next();
});

// middleware de protección
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// rutas públicas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// rutas protegidas (listado y detalle) -> usan el mismo router pero pasan por requireAuth
app.use('/peliculas', requireAuth, indexRouter);
app.use('/copia', requireAuth, indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;