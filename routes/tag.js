var express = require('express');
var router = express.Router();
const Tag = require('./../db/Tag');

router.get('/palette', Tag.getTagPalette );
router.get('/tags', Tag.getUserTagsByDay );
router.get('tags/since', Tag.getUserTopTagsSince );
router.post('tags/save', Tag.saveTag );

module.exports = router;;
