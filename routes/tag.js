const express = require('express');
const router = express.Router();
const Tag = require('./../db/Tag');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });
  
router.get('/palette', Tag.getTagPalette );
router.get('/tags', Tag.getUserTagsByDay );
router.get('/tags/since', Tag.getUserTopTagsSince );
router.post('/tags/save', Tag.saveTag );

module.exports = router;;
