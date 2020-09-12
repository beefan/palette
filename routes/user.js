const express = require('express');
const router = express.Router();
const path = require('path');

const User = require('./../db/User');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

router.get('/login', (req, res) => {
    res.sendFile(path.resolve('views/login.html'))
})
router.post('/login', User.loginUser );
router.post('/create', User.saveUser );

module.exports = router;