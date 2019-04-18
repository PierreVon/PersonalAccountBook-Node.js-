var express = require('express');
var router = express.Router();
index_controller = require('../controllers/index')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('io_forms', { title: 'Personal Account Book', totalMoney: 12000 });
// });

router.get('/', index_controller.index)

router.get('/changeToEarning', index_controller.earning)

module.exports = router;
