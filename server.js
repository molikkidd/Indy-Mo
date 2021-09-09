require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');

const auth = require('./controllers/auth');
const profile = require('./controllers/profile');
const SECRET_SESSION = process.env.SECRET_SESSION;


// connect to auth controller

// console.log(SECRET_SESSION);
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

//1. flash and sessions middleware
app.use(session({
  secret: SECRET_SESSION, //session cookie for user
  resave: false, // save session even if modified
  saveUninitialized: true // save new session, 
}));
app.use(flash());
//2. invoke passport and sessions
app.use(passport.initialize());
app.use(passport.session());

//3. store flash messages and user on 'res.locals'
app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})

// 4. set /auth route for controller 
app.use('/auth', auth);
app.use('/profile', profile);
// homepage route end point
app.get('/', (req, res) => {
  res.render('index');
});
// base endpoint for auth of users
app.get('/auth', (req,res) => {
  res.send('this is the auth page');
});
// profile route end point
app.get('/profile', isLoggedIn, (req,res) => {
res.send('this is the profile page');
});


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;


