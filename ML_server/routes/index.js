var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('okokokokokokoko');
  res.send("DB is connected.");
});

module.exports = router;
