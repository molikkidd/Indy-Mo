const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Get User Model from DataBase
const { User } = require('../models');

// Match user name and password in Database
const STRATEGY = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async (email, password, cb) => {
        try {
            const user = await User.findOne({
                where: { email }
            });

            if (!user || !user.validPassword(password)) {
                cb(null, false);
            } else {
                cb(null, user);
            }

        } catch (error) {
            console.log('-------ERROR BELOW-------')
            console.log(error);
        }
});
// passport "serialize" info to be able to login
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
// deserialize user and return if found
passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            cb(null, user)
        }
    } catch (error) {
        console.log('----Um...Hey, you have an errur');
        console.log(error);
    }
});
passport.use(STRATEGY);

module.exports = passport;