var express = require('express');
var router = express.Router();
var dataProvider = require('../data/dataProvider');

// procesar login
router.post('/login', function(req, res) {
  const { username, password } = req.body;
  const user = dataProvider.getUserByCredentials(username, password);

  if (!user) {
    return res.status(401).render('login', { error: 'Credenciales incorrectas' });
  }

  // guardar usuario en sesion
  req.session.user = {
    username: user.username,
    nombre: user.nombre,
    copias: user.copias
  };

  res.redirect('/peliculas');
});

// logout
router.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
});

module.exports = router;
