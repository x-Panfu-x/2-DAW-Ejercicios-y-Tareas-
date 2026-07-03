var express = require('express');
var router = express.Router();
var dataProvider = require('../data/dataProvider');

// home
router.get('/', function(req, res) {
  res.render('index');
});

// formulario de login (pagina publica)
router.get('/login', function(req, res) {
  res.render('login', { error: null });
});

router.get('/contact', function(req, res) {
  res.render('contact');
});


// listado de peliculas (ruta protegida en app.js)
router.get('/peliculas', function(req, res) {
  const movies = dataProvider.getAllMovies();
  res.render('peliculas', { peliculas: movies });
});

// detalle de pelicula (ruta protegida en app.js)
router.get('/copia/:id', function(req, res) {
  const movie = dataProvider.getMovieById(req.params.id);
  if (!movie) {
    return res.status(404).render('error', { message: 'Película no encontrada', error: {} });
  }
  res.render('detalle', { pelicula: movie });
});

module.exports = router;
