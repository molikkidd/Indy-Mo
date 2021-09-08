require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');

const auth = require('./controllers/auth');
const SECRET_SESSION = process.env.SECRET_SESSION;

app.use(flash());

// connect to auth controller

// console.log(SECRET_SESSION);


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

// flash and sessions middleware
app.use(session({
  secret: SECRET_SESSION, //session cookie for user
  resave: false, // save session even if modified
  saveUninitialized: true // save new session, 
}));

// store flash messages and user on 'res.locals'
app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})

// invoke passport and sessions
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth);


app.get('/', (req, res) => {
  res.render('index');
});
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email }= req.user.get();
  res.render('profile', { id, name, email });
});


// base endpoint for users
app.get('/auth', (req,res) => {
  res.send('this is the auth page');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
