const express = require('express');
const router = express.Router();

const Settings = require('./../db/Settings');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

router.get('/', Settings.getUserSettings );
router.post('/save', Settings.saveUserSettings );

module.exports = router;