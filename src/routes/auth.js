const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

//REGISTRO-FORM
router.get('/registro', isNotLoggedIn, (req, res)=>{
    res.render('auth/signup');
});

router.post('/registro', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/registro',
    failureFlash: true
}))


//LOGIN-FORM
router.get('/login', isNotLoggedIn, (req, res)=>{
    res.render('auth/signin');
});

router.post('/login', (req, res, next) => {
    /*
    req.check('username', 'Username is Required').notEmpty();
    req.check('password', 'Password is Required').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
      req.flash('message', errors[0].msg);
      res.redirect('/login');
    }
    */
    passport.authenticate('local.signin', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });

//PROFILE
router.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile');
});

//LOGOUT
router.get('/logout',(req,res)=>{
  req.logOut();
  res.redirect('/login');
});






module.exports = router;