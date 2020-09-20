const express = require('express');
const router = express.Router();
const Tag = require('./../db/Tag');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/palette', Tag.getTagPalette);
router.get('/tags/:date', Tag.getUserTagsByDay);
router.get('/tags/:tag/cousins/:num', Tag.getUserTagCousins);
router.get('/tags/since/:days', Tag.getUserTopTagsSince);
router.post('/tags/save', Tag.saveTag);

module.exports = router;
