const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./../db/User');

passport.use(new LocalStrategy({passReqToCallback: true}, User.loginUser ));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

router.get('/login/failed', (req, res) => {
    res.status(403).send({msg: 'Login Failed'});
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login/failed',
}));

router.post('/create', (req, res) => {
    User.saveUser(req, res);
});
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/user/login');
})

module.exports = router;