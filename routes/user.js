var express = require('express');
var router = express.Router();
const User = require('./../db/User');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

router.post('/login', User.loginUser );
router.post('/create', User.saveUser );

module.exports = router;