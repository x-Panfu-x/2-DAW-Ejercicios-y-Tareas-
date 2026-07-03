var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');  // Página principal
});
router.get('/login', function(req, res) {
  res.render('login');  // Login
});
router.get('/contact', function(req, res) {
  res.render('contact'); // Contacto
});

module.exports = router;
