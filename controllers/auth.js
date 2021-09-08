const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const { User } = require('../models');

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});



// login info passed thru passport  
router.post("/login", passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect:'/auth/login',
  successFlash: 'Welcome back ...',
  failureFlash: 'Either email or password is incorrect'
}));

router.post("/signup", async (req, res) => {
  const { email, name, password } = req.body; 
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password }
    });

    if (created) {
      // if new user created then redirect back to /.. page
      console.log(`-----${user.name} was created ------`);
      const successObject = {
        successRedirect: '/',
        successFlash: `Welcome ${user.name}. Account was created and logging in...`
      }
      passport.authenticate('local', successObject)(req, res);
    } else {
      req.flash('error','Email already exists');
      res.redirect('/auth/signup');
    }

  } catch (error) {
    console.log('*********ERRROORR');
    console.log(error);
    req.flash('error', 'Either email or password is incorrect. Please try again.');
    res.redirect('/auth/signup');
  }
});

router.get("/logout", (req,res) => {
  req.logOut();
  req.flash('success', 'Logging out ... See you next time!');
  res.redirect('/');
});
module.exports = router;