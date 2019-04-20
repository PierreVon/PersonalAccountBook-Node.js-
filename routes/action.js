var express = require('express');
var router = express.Router();
action_controller = require('../controllers/action')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('io_forms', { title: 'Personal Account Book', totalMoney: 12000 });
// });

router.post('/action/postExp', action_controller.postExp)

router.post('/action/postEar', action_controller.postEar)

module.exports = router;