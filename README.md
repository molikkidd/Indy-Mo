# `Indy Mo`

It is an Express authentication based application using Passport + Flash messages + custom middleware

## What it includes

* Sequelize user model / migration
* Settings for PostgreSQL
* Passport and passport-local for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt
* EJS Templating and EJS Layouts

### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| firstName | String | Must be provided |
| lastName | String | Must be provided |
| email | String | Must be unique / used for login |
| nmlsId | String | Must be unique |
| password | String | Stored as a hash |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Lead Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| firstName | String | Must be provided |
| lastName | String | Must be provided |
| phoneNumber | String | Must be provided |
| address | String | Must be provided |
| state | String | Must be provided |
| zipCode | String | Must be provided |
| email | String | Must be unique / used for login |
| userId | String | inherited from user |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Auth Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes session info |
| GET | /profile | server.js | Regular User Profile |

### Profile and Leads Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | /leads | profile.js | show all leads |
| GET | /leads/:idx | profile.js | show one lead |
| POST| /leads/showLead | profile.js | add new lead form |
| GET | /newLead | profile.js | add new lead to db |
| POST | /leads | profile.js | edit FORM for lead |
| GET | /leads//edit/:idx | profile.js | add new edits to lead db |
| POST | /leads/:idx | profile.js | delete lead from db |
| GET | /leads/delete/:idx | profile.js | delete lead from db |

## `1` Fork & Clone Project & Install Dependencies

`1` The first thing that we are going to do is `fork` and `clone`

`2` Now we are going to install the current dependencies that are listed inside of `package.json`
```text
npm install
```

`3` We need to install some packages that will be used for `authentication`. Those are the following packages:

```text
npm install bcrypt connect-flash passport passport-local express-session method-override
and 
npm install axios dotenv express-ejs-layout express ejs pg sequelize sequelize-cli ws

```

- [axios](https://github.com/axios/axios):
  Promise based HTTP client for the browser and node.js 
-  [bcrypt](https://www.npmjs.com/package/bcrypt): 
  A library to help you hash passwords. ([wikipedia](https://en.wikipedia.org/wiki/Bcrypt)) 
  Blowfish has a 64-bit block size and a variable key length from 32 bits up to 448 bits.
- [connect-flash](https://github.com/jaredhanson/connect-flash): 
  The flash is an area of the session used for storing messages that will be used to to display to the user. Flash is typically used with redirects.
- [dotenv](https://github.com/motdotla/dotenv):
  Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
- [ejs](https://github.com/mde/ejs):
  Static caching of intermediate JavaScript, Static caching of templates
  Complies with the Express view system
- [express](https://github.com/expressjs/express):
  ExpressJS is a web application framework that provides you with a simple API to build websites, web apps and back ends.
- [express-ejs-layouts](https://github.com/Soarez/express-ejs-layouts):
  Creates a template structure which allows us to easily render files without duplicate code.
- [express-session](https://github.com/expressjs/session): 
  Create a session middleware with given *options*.method-override):
- [method-override](https://github.com/expressjs/method-override): 
  Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
- [passport](https://www.passportjs.org/docs/): 
  Passport is authentication middleware for Node.js. It is designed to do one thing authenticate requests. There are over 500+ strategies used to authenticate a user; however, we will be using one - *passport-local* Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests
- [passport-local](http://www.passportjs.org/packages/passport-local/):  
  The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user.  
- [pg](https://github.com/brianc/node-postgres):
  Is a SQL based database, following the model/ table model
- [sequelize](https://github.com/sequelize/sequelize):
  Is a Object Relational Mapper (ORM), that allows your application to interact with the postgres database
- [sequelize-cli](https://github.com/sequelize/cli):
- [ws](https://github.com/websockets/ws):

`4` Make a commit

```text
git add .
git commit -m "Install dependencies for project"
```

## `2` Create Database & Update Sequelize Config

`1` Update **`config.json`** file with the following:

```json
{
  "development": {
    "database": "express_authentication_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "express_authentication_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
        "ssl": {
          "require": true,
          "rejectUnauthorized": false
        }
    }
  }
}
```

`2` Create database `express_authentication_development`

```text
sequelize db:create
```

## `3` Analyze File Structure

```text
├── config
│   └── config.json
│   └── ppConfig.json
├── controllers
│   └── auth.js
│   └── profile.js
├── middleware
│   └── index.js
├── migrations
│   └── index.js
├── models
│   └── index.js
├── node_modules
│   └── ...
├── public
│   └── assets
|       └── .keep 
│   └── css
│       └── dashboard.css
│       └── style.css
├── seeders
│   └── auth.test.js
├── test
│   └── auth.test.js
│   └── index.test.js
│   └── profile.test.js
│   └── user.test.js
├── views
│   └── auth
│       └── login.ejs
│       └── signup.ejs
│   └── leads
|       └── edit.ejs
│       └── new.ejs
│       └── show.ejs
│   └── partials
|       └── alert.ejs
│   └── index.ejs
│   └── layout.ejs
│   └── leadsThree.ejs
│   └── profile.ejs
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── server.js
├── socketServer.js
├── wSpage.html
```

- `config.json`: Where you need to configure your project to interact with your postgres database and passport localStrategy.
- `controllers`: The folder where all of your controllers ( routes ) will go to control the logic of your app.
- `models`: The folder where all the models will be stored that will interact with the database.
- `node_modules`: The folder that is generated by **npm** that stores the source code for all dependencies installed.
- `public`: is to have those views that would be publicly accessible in the application. ex. `style.css`
- `test`: The folder where all your test that you make will be stored. ex. `auth.test.js`
- `views`: The folder where all the app's templates will be stored for displaying pages to the user. ex. `login.ejs`
- `.gitignore`: A hidden file that will hide and prevent any files with to NOT get pushed to Github.
- `package-lock.json`: is automatically generated for any operations where npm modifies either the `node_modules` tree, or `package.json`.
- `package.json`: The settings file that stores scripts and list of dependencies that are used inside your app.
- `README.md`: The main markdown file that written to explain the details your app.
- `server.js`: The main file that controls the entire application.

## `4` Create `user` Model & Add Validations

`1` Add `User` model

```text
sequelize model:create --name User --attributes firstName:string,lastName:string,email:string,password:string,nmlsId:integer

sequelize model:create --name User --attributes firstName:string,lastName:string, phoneNumber:string,address:string,state:string, zipCode:integer,email:string,userId:string,nmlsId:integer
```

`2` Add **validations** for `User` model

Validations are used as constraints for a column in a table that requires an entry in the database to follow various rules set in order for that data to be entered into the database.

```js
'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Lead, {foreignKey: "userId"});
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING, 
      validate: {
        len: {
         args: [1,99],
         msg: 'Name must be between 1 and 99 characters'
        }
       }
    },
    lastName: {
    type: DataTypes.STRING, 
    validate: {
      len: {
       args: [1,99],
       msg: 'Name must be between 1 and 99 characters'
      }
     }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    password : {
      type: DataTypes.STRING,
      validate: {
        len : {
          args: [8,12],
          msg: 'The password needs to be between 8 and 12 characters'
        }
      }
    },
    nmlsId: {
      type: DataTypes.INTEGER, 
      validate: {
        len: {
         args: [7,7],
         msg: 'Name must be be 7 digits long'
        }
       }
    } 
  },{
    sequelize,
    modelName: 'User',
  });

  return User; // add functions above 
};
```

"repeat same steps for lead model"

`3` Make a *commit* message
```text
git add .
git commit -m "add: User model and validations"
```

## `5` Add Methods to `User` Model to Hash Password, Etc.

`1` Import `bcrypt` at the top of `User` model
```js
const bcrypt = require('bcrypt');
```

`2` Create a hook `beforeCreate` to hash **password** inside `User` model before it enters the database

Inside of the user model, add the following hook to hash password

```js
// Before a user is created, we are encrypting the password and using hash in its place
User.addHook('beforeCreate', (pendingUser) => { // pendingUser is user object that gets passed to DB
    // Bcrypt is going to hash the password
    let hash = bcrypt.hashSync(pendingUser.password, 12); // hash 12 times
    pendingUser.password = hash; // this will go to the DB
});  
```

`3` Add `validPassword()` method to `User` model that will compare a password entered with the hashed password

```js
 // Check the password on Sign-In and compare it to the hashed password in the DB
User.prototype.validPassword = function(typedPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password); // check to see if password is correct.

    return isCorrectPassword;
}
```

`4` Add `toJSON()` method to `User` model that will delete password to prevent from being used on the client

```js
// return an object from the database of the user without the encrypted password
User.prototype.toJSON = function() {
    let userData = this.get(); 
    delete userData.password; // it doesn't delete password from database, only removes it. 
    return userData;
}
```

`5` Verify that model looks like the following code snippet ( [here](https://github.com/romebell/express_authentication/blob/main/solutions.md#1-userjs) )

`6` Do a migration

```text
sequelize db:migrate
```

## `6` Add `SECRET SESSION` and Flash to App

`1` Create a `.env` file and place an evironment variable `SECRET_SESSION` with the string of your choice

```env
SECRET_SESSION=alldayidreamaboutsoftwareengineering
```

`2` Add `.env` to .gitignore file

`3` Import the `connect-flash` and `express-session` under the imports inside the server file
```js
const session = require('express-session');
const flash = require('connect-flash');
```

`4` Add `SECRET_SESSION` variable that will be a reference to the environment variable set in step `1`. Print to make sure the variable is displaying inside the **terminal**

```js
const SECRET_SESSION = process.env.SECRET_SESSION;
// console.log(SECRET_SESSION);
```

`5` Add session and flash middleware to be used throughout app inside `server.js`

Add below the current middleware is located ( before routes )
```js
app.use(flash());            // flash middleware

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));


```

`7` Add **function**  as middle to store flash messages and user on `res.locals` 
```js
app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});
```

`8` Make *commit* message
```text
git add .
git commit -m "Create env variable and add session and flash middleware" 
```

## `7` Create Passport Configuration

`1` Create a file called `ppConfig.js` inside of the `config` folder

`2` Import `passport`, `passport-local` and the `database` into **`ppConfig.js`** file
```js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Database
const { User } = require('../models');
```

`3` Create a new instance of a `LocalStrategy`

```js
const STRATEGY = new LocalStrategy({
    usernameField: 'email',         // looks for an email field as the username
    passwordField: 'password'       // looks for an password field as the password
    }, async (email, password, cb) => {
        try {
            const user = await User.findOne({
                where: { email }
            });

            if (!user || !user.validPassword(password)) { 
                cb(null, false);     // if no user or invalid password, return false
            } else {
                cb(null, user);
            }
        } catch (err) {
            console.log('------- Error below -----------');
            console.log(err);
        }
})
```

`4` Serialize User with Passport in order to login

```js
// Passport "serialize" info to be able to login
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
```

`5` Deserialize user and return user if found by `id`

```js
passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findByPk(id);

        if (user) {
            cb(null, user)
        }
    } catch (err) {
        console.log('---- Yo... There is an error ----');
        console.log(err);
    }
});
```

`6` Use new instance of `LocalStrategy` inside of Passport as middleward

```js
passport.use(STRATEGY);
```

`7` Export passport from `ppConfig.js`

```js
module.exports = passport;
```

`8` Make *commit* message
```text
git add .
git commit -m "ppConfig: Create passport configuration" 
```

## `8` Import Passport Config and Initialize
After making local strategy for passport, we now need to import the **`ppConfig.js`** file into the server, initialize and use it as middleware throughout the app.

`1` Import the `ppConfig.js` file like so with other imports inside server

```js
const passport = require('./config/ppConfig');
```

`2` Initialize passport and passport session, invoke it, and pass through as middleware. Place this between the middleware that invokes **`flash`** and the middleware that is using **`res.locals`**.

```js
app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session
```

It should be placed on the server like so:

```js
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});
```

`3` Import the `ppConfig.js` file inside of `auth.js` located in the **`controllers`** folder

```js
const passport = require('../config/ppConfig');
```

`4` Make *commit* message
```text
git add .
git commit -m "server: Import passport and pass through middleware" 
```

## `9` Add `isLoggedIn` Middleware

The purpose of this middleware will be to check to see if a user is logged in before they are allowed to have a access to a specific route. This middleware will be place inside a route between the route ( `/profile` ) and the callback with the request ( `req` ), and response ( `res` ) parameters inside.

`1` Create a folder called `middleware` on the top level.

`2` Create a file inside of the **`middleware`** folder called `isLoggedIn.js`.

`3` Add a function **`isLoggedIn()`** that take in 3 params: `req`, `res`, and `next`.

```js
function isLoggedIn(req, res, next) {
    if (!req.user) {
        req.flash('error', 'You must be signed in to access page');
        res.redirect('/auth/login');
    } else {
        next();
    }
}
```

`4` Export the function

```js
module.exports = isLoggedIn;
```

`5` Import `isLoggedIn` inside of **`server.js`**
```js
const isLoggedIn = require('./middleware/isLoggedIn');
```

`6` Make *commit* message
```text
git add .
git commit -m "isLoggedIn: add middleware and import to server" 
```

## `10` Make Login `/POST` Route
We need now to make a `/POST` for the data that get submitted with the 
**login** form. The **`action`** in the fom specifies the route **`/auth/login`** that needs to be made for the data to go to. The data that is submitted will be check against the database to validity before being logged into the app.

The form that the data will be submitted from:
```ejs
<form action="/auth/login" method="POST">
  <label for="auth-email">Email</label>
  <input id="auth-email" type="email" name="email" required>

  <label for="auth-password">Password</label>
  <input id="auth-password" type="password" name="password" required>

  <input type="submit" value="Log In">
</form>
```

`1` Create a **`post`** route for login. All the methods that are given for the `/login` post route are Passport's way of authenticating a user
```js
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back ...',
  failureFlash: 'Either email or password is incorrect' 
}));
```

`2` Run **`mocha`** to see how many tests passed

`3` Make *commit* message
```text
git add .
git commit -m "auth: add login post route"
```

## `11` Make Signup `/POST` Route
We need now to make a `/POST` route for the data that get submitted with the **signup** form. The **`action`** in the fom specifies the route that needs to be made for the data to go to. The data that is submitted will be used to create a new user and added to the database. After signing up user, we will redirect them back to the login page to login.

The form that the data will be submitted from:
```ejs
<form action="/auth/signup" method="POST">
  <label for="new-email">Email</label>
  <input id="new-email" type="email" name="email" required>

  <label for="new-name">Name</label>
  <input id="new-name" type="text" name="name" required>

  <label for="new-password">Password</label>
  <input id="new-password" type="password" name="password" required>

  <input type="submit" value="Sign up">
</form>
```
`1` Import **`database`** into `auth.js` file
```js
const { User } = require('../models');
```

`2` Create a **`post`** route for signup

```js
router.post('/signup', async (req, res) => {
  // we now have access to the user info (req.body);
  const { email, name, password } = req.body; // goes and us access to whatever key/value inside of the object
  try {
    const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { name, password }
    });

    if (created) {
        // if created, success and we will redirect back to / page
        console.log(`----- ${user.name} was created -----`);
        const successObject = {
            successRedirect: '/',
            successFlash: `Welcome ${user.name}. Account was created and logging in...`
        }
        // 
        passport.authenticate('local', successObject)(req, res);
    } else {
      // Send back email already exists
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup'); // redirect the user back to sign up page to try again
    }
  } catch (error) {
        // There was an error that came back; therefore, we just have the user try again
        console.log('**************Error');
        console.log(error);
        req.flash('error', 'Either email or password is incorrect. Please try again.');
        res.redirect('/auth/signup');
  }
});
```

`3` Run **`mocha`** to see how many tests passed

`4` Make *commit* message
```text
git add .
git commit -m "auth: add signup post route"
```

## `12` Make `logout` /GET Route
The purpose of this route is to log the user out of the app. The main part of this route will be a built in function provided by request ( `req` ) that would do this: **`req.logout()`**. Then we will display a flash message to the user letting them know that they logged out. Lastly, we will direct the user back to the home page ( `/` ) like the majority of apps do after logging out.

`1` Create `/logout` route to log user out

```js
router.get('/logout', (req, res) => {
  req.logOut(); // logs the user out of the session
  req.flash('success', 'Logging out... See you next time!');
  res.redirect('/');
});
```

`2` Run **`mocha`** to see how many tests passed

`3` Make *commit* message
```text
git add .
git commit -m "auth: add logout get route"
```

## `13` Create Partials For Alerts
The purpose of these partials ( `views` ) is to render the `flash` alerts to the frontend. There will be some logic written out to display to the user is they may have gotten the password incorrect or that they were successful in logging in. We will be adding these partials to the **`layout.ejs`** page.

`1` Create a folder called **`partials`** inside of the `views` folder

`2` Create a file called **`alerts.ejs`** inside of the `partials` folder

`3` Create two conditionals that will look for `error` flash messages or `success` flash messages that were created in various routes. We will be adding classes on these messages to display in **green** for success messages and **red** for error messages

```ejs
<% if (alerts.error) { %>
    <% alerts.error.forEach(msg => { %>
        <div class="alert alert-danger"><%= msg %></div>
   <% }) %>
<% } %>

<% if (alerts.success) { %>
    <% alerts.success.forEach(msg => { %>
        <div class="alert alert-success"><%= msg %></div>
   <% }) %>
<% } %>
```

`4` Include the `alert` partials inside of the `layout.ejs` file at the beginning of the body

```js
<%- include('partials/alerts') %>
```

`5` Include **`Bootstrap`** CDN inside of the `layout.ejs` page

Inside of the **`<head>`**
```ejs
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
```

Before the last **`</body>`** tag
```ejs
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
```

`6` Make *commit* message
```text
git add .
git commit -m "alerts: add partials for flash alerts"
```

## `14` Add Logic to Layout Page For User
The purpose of building out this logic will be to display on the page whether or not the user is logged in or not. If the user is logged in, then we would remove a link for logging in or signup. If the user is not logged in, the we will display the links for the user to log in or sign up.

`1` Add conditional logic to display links for being logged in or not inside of `layout.ejs`
```ejs
<% if (!currentUser) {%>
    <li><a href="/auth/signup">Signup</a></li>
    <li><a href="/auth/login">Login</a></li>
<% } else { %>
    <li><a href="/auth/logout">Logout</a></li>
    <li><a href="/profile">Profile</a></li>
<% } %>
```

`2` Double check **`layout.ejs`** to make sure it looks like ( [this](https://github.com/romebell/express_authentication/blob/main/solutions.md#2-layoutejs) )

## `15` Add Profile View and Controller
The purpose of this step is to add a view and controller for a user to see their information on a profile page. We will to build a GET route to `/profile` that will send the user data to the `profile.ejs` to be displayed whenever a user logs in.

`1` Create a GET route to `/profile` and include `isLoggedIn` middleware to check to see if user is logged in beforehand inside of `server.js`

```js
// Add this above /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});
```

`2` Add user `id`, `name`, `email` to the **`profile.ejs`**

```ejs
<h2>Profile Page</h2>

<h3>Welcome to your PROFILE</h3>

<p>Id: <%= id %></p>
<p>Name: <%= name %></p>
<p>Email: <%= email %></p>
```

`2` Run **`mocha`** to see how many tests passed

`3` Make *commit* message
```text
git add .
git commit -m "profile: add route and send data to view page"
```

## `16` Create Profile.js
Create a profile.js file to interact with the user model. The purpose of this file is to create the CRUD routes for the leads. Import the necessary dependencies and create the logic for the routes.

```js
const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const { Lead, User } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const fetch = require('node-fetch');

// profile of user
const profile =  (req,res) => {
    const { id, firstName, lastName, email, nmlsId } = req.user.get();

    myAxios(`https://finnhub.io/api/v1/news?category=technology&token=${process.env.FINNHUB_API_KEY}`)
    .then(data => {
        // console.log(data);
        res.render('profile', { id, firstName, lastName, email, nmlsId, marketData: data});
    }).catch(err => {
        console.log('you have an error with finnhuB NEWS', err)
    });
};
```

## `17` Show all the leads
Show all the leads from the database to /leads/ route  

```js
// show all the leads
const allLeads = async (req,res) => {
    try {
        const rawData = await Lead.findAll({});
        const leadData = rawData.map(u => u.toJSON());
     res.render('leadsThree', {leadObj: leadData});

    } catch (error) {
        console.log(error)
    }
}
// index of leads
const leadsIdx = async (req,res) => {
    try {
        const rawData = await Lead.findByPk(req.params.idx);
        const leadData = rawData.toJSON();
        
        res.render('leads/show', { leadObj: leadData});
    } catch (error) {
        console.log(error)
    }
}
// show one lead 
const showLead = async (req,res) => {
    try {
        const rawData = await Lead.findAll({});
        const leadData = rawData.map(u => u.toJSON());
        // search for lead in DB by name then render show/lead
        let searchValue = req.body.showLead;
        // console.log(leadData);
        console.log('search value',searchValue);
        if(searchValue) {
            for (let i = 0; i < leadData.length; i++) {
                const lead = leadData[i];
                if(searchValue.toLowerCase() === lead.firstName.toLowerCase()) 
                {
                    console.log('name of the lead',lead);
                    res.redirect(`/profile/leads/${lead.id}`)
                } 
            }
        } 
    } catch (error) {
        console.log('you have an error on ShowLead:',error)
    }
}  
```

## `18` Add New Lead

```html
<h2>Add New Lead</h2>
              <a class="btn btn-primary"href="/profile">Back to Profile</a>
              <form method="POST" action="/profile/leads" class="row g-2">
                  <div class="col-md-6">
                      <label for="firstName">First Name </label>
                      <input id="firstName"  class="form-control" type="text" name="firstName" placeholder="First Name ">
                  </div>
                  
                  <div  class="col-md-6">
                      <label for="lastName">Last Name</label>
                      <input id="lastName" class="form-control" type="text" name="lastName" placeholder="last Name ">
                  </div>
              
                  <div class="col-md-4">
                      <label for="phoneNumber">Phone Number</label>
                      <input id="phoneNumber"  class="form-control" type="text" name="phoneNumber" placeholder="(111) 222-3333">
                  </div>
              
                  <div class="col-md-6">
                      <label for="address">Address</label>
                      <input id="address"  class="form-control" type="text" name="address">
                  </div>
              
                  <div class="col-md-2">
                      <label for="state">State</label>
                      <input id="state"  class="form-control" type="text" name="state" placeholder="CA">
                  </div>
              
                  <div class="col-md-2">
                      <label for="zipCode">Zip Code</label>
                      <input id="zipCode" class="form-control" type="text" name="zipCode" placeholder="- - - - -">
                  </div>
              
                  <div class="col-md-6">
                      <label for="new-email">Email address</label>
                      <input type="email" class="form-control" id="new-email" aria-describedby="emailHelp" placeholder="Enter email" name="email">
                      <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
              
                  <button type="submit" class="btn btn-primary">Submit</button>
              </form>       
```

```js
// new lead FORM
const newLead = async (req,res) => {
    res.render('leads/new');
}
// add new lead to database
const addNewLead = async (req,res) => {
    // grab data from the form
    const { firstName, lastName, phoneNumber, address, state, zipCode, email } = req.body;

    console.log('new lead info',firstName, lastName, phoneNumber, address, state, zipCode, email);
    // find user by id
    try {
        const fetchUser = await User.findByPk(req.user.id);
        const newLead = await fetchUser.createLead({ 
            firstName, 
            lastName, 
            phoneNumber, 
            address, 
            state, 
            zipCode,
            email 
        });
        console.log(newLead);
        let lead = newLead.toJSON();
        console.log(lead);
        req.flash('success','You added a new lead');
        res.redirect(`/profile/leads/${lead.id}`);
    
      } catch (error) {
        console.log('*********ERRROORR');
        console.log(error);
        req.flash('error', 'There is an error. Please try again.');
        res.redirect('/profile');
      }

}
```

## `18` Edit Lead
Create the edit form for the lead and add ejs values for input fields.

```html
   <div>
        <h2>Edit Lead </h2>
        <a class="btn btn-primary"href="/profile/leads">back to leads</a>
      </div>       
      <form class="row g-3 mt-3 d-flex justify-content-center" method="POST" action="/profile/leads/<%=leadObj.id%>" >
        <div class="col-md-4">
          <label for="firstName" class="form-label"> First Name </label>
          <input id="firstName"  class="form-control" type="text" name="firstName" value="<%= leadObj.firstName %> ">
        </div>
        <div class="col-md-2">
          <label for="MiddleName" class="form-label"> M. I. </label>
          <input id="MiddleName"  class="form-control" type="text" name="MiddleName" value=" ">
        </div>
        <div class="col-md-4">
          <label for="lastName" class="form-label"> Last Name </label>
          <input id="lastName"  class="form-control" type="text" name="lastName" value="<%= leadObj.lastName %> ">
        </div>
        <div class="row g-3 d-flex justify-content-center">
          <div class="col-md-5">
            <label for="new-email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="new-email" aria-describedby="emailHelp" name="email" value="<%= leadObj.email %> ">
          </div>
          <div class="col-md-4">
            <label for="phoneNumber" class="form-label"> Phone Number</label>
          <input id="phoneNumber"  class="form-control" type="text" name="phoneNumber" value="<%=leadObj.phoneNumber%> ">
          </div>
        </div>     
        <div class="col-5">
          <label for="address" class="form-label"> Address</label>
          <input id="address"  class="form-control" type="text" name="address" value="<%= leadObj.address %> ">
        </div>
        <div class="col-md-3">
          <label for="city" class="form-label">City</label>
          <input type="text" class="form-control" id="city" name="city">
        </div>
      <div class="row g-3 d-flex justify-content-center">
        <div class="col-md-3">
          <label for="state" class="form-label">State</label>
          <select id="state" class="form-select" name="state">
            <option selected><%=leadObj.state%></option>
            <option value="AL">AL</option><option value="AK">AK</option><option value="AZ">AZ</option><option value="AR">AR</option><option value="CA">CA</option>       
            <option value="CO">CO</option><option value="CT">CT</option><option value="DE">DE</option><option value="FL">FL</option><option value="GA">GA</option>       
            <option value="ID">ID</option><option value="IL">IL</option><option value="IN">IN</option><option value="IA">IA</option><option value="KS">KS</option>
            <option value="KY">KY</option><option value="LA">LA</option><option value="ME">ME</option><option value="MD">MD</option><option value="MA">MA</option>
            <option value="MI">MI</option><option value="MN">MN</option><option value="MS">MS</option><option value="MO">MO</option><option value="MT">MT</option>
            <option value="NE">NE</option><option value="NV">NV</option><option value="NH">NH</option><option value="NJ">NJ</option><option value="NM">NM</option>
            <option value="NY">NY</option><option value="NC">NC</option><option value="ND">ND</option><option value="OH">OH</option><option value="OK">OK</option>
            <option value="OR">OR</option><option value="PA">PA</option><option value="RI">RI</option><option value="SC">SC</option><option value="SD">SD</option>
            <option value="TN">TN</option><option value="TX">TX</option><option value="UT">UT</option><option value="VT">VT</option><option value="VA">VA</option>
            <option value="WA">WA</option><option value="WV">WV</option><option value="WI">WI</option><option value="WY">WY</option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="inputZip" class="form-label">Zip Code</label>
          <input type="text" class="form-control" id="inputZip" name="zipCode" value="<%= leadObj.zipCode%>">
        </div>
        <div class="col-md-3">
            <button type="submit" class="btn btn-primary form-control">Submit</button>
        </div>
      </div>  
      </form>
```

Add logic to connect to the database and update the new data.

```js
// edit lead FORM db
const editLead = async (req,res) => {
    try {
        const leadIdx = req.params.idx;
        const rawData = await Lead.findByPk(leadIdx);
        const leadData = rawData.toJSON();

        res.render('leads/edit', {leadObj: leadData});
    } catch (error) {
        console.log(error)
    }  
}
// add edited lead to db
const addEditedLead = async (req,res) => {
    const { firstName, lastName, phoneNumber, address, state, zipCode, email } = req.body;
    const id = req.params.idx;
    console.log("THE PHONE NUMBER:", phoneNumber);
    try {
        const numberOfRowsUpdate = await Lead.update({ firstName, lastName, phoneNumber, address, state, zipCode },{
            where: {id : id}
        });
        res.redirect(`/profile/leads/${id}`);
        console.log('you have successfully updated a lead');
    } catch (error) {
        console.log('you had an error updating a lead: --->', error)
    }
}
```

## `18` Delete/Deactivate Lead

```js
// delete or deactivate from db
const deactivateLead = async (req,res) => {
    const leadId = req.params.idx
    console.log(leadId);

    try {
        let deleteUserData = await Lead.destroy({
            where: {id: leadId}
        });  
        res.redirect('/profile/leads');
    //   returns a number of how many users where deleted
        console.log(deleteUserData)
    } catch (error) {
        console.log(error);
    }
}
```

## `19` Start App and Debug

`1` Start up server and test app

```text
npm start
```

`2` Complete any debugging that needs to happen.

`3` Push final changes to Github.

`4` Make this repo a **Template** on Github for future projects (i.e. Project 2) ✅
