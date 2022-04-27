var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      else if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      else {
        return done(null, user);
      }
    });
  })
);
  

const connectionString = "mongodb+srv://mani:mani@cluster0.kmhj7.mongodb.net/learnMongo?retryWrites=true&w=majority";
mongoose = require('mongoose');
mongoose.connect(connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true });

var Costume = require("./models/costume");
var Mobile = require("./models/mobile");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mobilesRouter = require('./routes/mobiles');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mobiles', mobilesRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter)
app.use('/resource', resourceRouter);


var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

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

/// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
  await Costume.deleteMany();

  let instance1 = new Costume({ costume_type: "Mummy", size: 'large', cost: 25.4 });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved in Costume")
  });

  let instance2 = new Costume({ costume_type: "Dog", size: 'small', cost: 16 });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved in Costume")
  });

  let instance3 = new Costume({ costume_type: "Superman", size: 'medium', cost: 12.4 });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved in Costume")
  });

  let instance4 = new Costume({ costume_type: "Cat", size: 'large', cost: 22 });
  instance4.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Fourth object saved in Costume")
  });

// Delete everything in Mobile
  await Mobile.deleteMany();

  let instance5 = new Mobile({ mobile_brand: "xiomi", mobile_color: 'Mi 5', mobile_cost: 5005 });
  instance5.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved in Mobile")
  });

  let instance6 = new Mobile({ mobile_brand: "Zen", mobile_color: 'model x', mobile_cost: 909 });
  instance6.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved in Mobile")
  });

  let instance7 = new Mobile({ mobile_brand: "Motrola", mobile_color: 'broad 36', mobile_cost: 405 });
  instance7.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved in Mobile")
  });

  let instance8 = new Mobile({ mobile_brand: "Realme", mobile_color: 'm31 pro', mobile_cost: 895 });
  instance8.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Fourth object saved in Mobile")
  });
}
let reseed = true;
if (reseed) { recreateDB(); }

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () { console.log("Connection to DB succeeded") });