var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Video Games Library'
});
});

// Get register
router.get('/register', function(req, res, next) {
  res.render('register',
  { title: 'Register'
 })
})

// GET Login
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login'
})
})

module.exports = router;
