var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/portal(/*)?', function(req, res, next) {
  res.render('portal');
});
router.get('(/*)?', function(req, res, next) {
  res.render('index');
});
module.exports = router;
