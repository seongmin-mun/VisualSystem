var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/PreechVis', function (req, res, next) {  //next를 사용해서 다음으로 넘긴다.
  console.log(req.query);
  res.render('PreechVis/PreechVis', {title: 'PreechVis'});  //view의 index파일을 rendering하겠다.
});

router.get('/Guideline', function (req, res, next) {  //next를 사용해서 다음으로 넘긴다.
  console.log(req.query);
  res.render('PreechVis/Guideline', {title: 'Guideline'});  //view의 index파일을 rendering하겠다.
});

module.exports = router;
