var express = require('express');
const mobile_controller = require('../controllers/mobile');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('mobiles', { title: 'Search Results' });
});
*/

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
}
/* GET costumes */
router.get('/', mobile_controller.mobile_view_all_Page );
/* GET detail mobile page */
router.get('/detail', mobile_controller.mobile_view_one_Page);
/* GET create mobile page */
router.get('/create',secured, mobile_controller.mobile_create_Page);
/* GET create update page */
router.get('/update',secured, mobile_controller.mobile_update_Page);
/* GET delete mobile page */
router.get('/delete',secured, mobile_controller.mobile_delete_Page);

module.exports = router;
