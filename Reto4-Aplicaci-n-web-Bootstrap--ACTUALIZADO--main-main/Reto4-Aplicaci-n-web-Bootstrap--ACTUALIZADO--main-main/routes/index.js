var express = require('express');
var router = express.Router();

// Importar conexión a BD y DAOs
var dbConnection = require('../data/database').getConnection();
var UsuarioDAO = require('../data/usuario-dao');
var VideojuegoDAO = require('../data/videojuego-dao');
var authMiddleware = require('../middlewares/auth');

// Instanciar DAOs
var usuarioDAO = new UsuarioDAO(dbConnection);
var videojuegoDAO = new VideojuegoDAO(dbConnection);

/* --- RUTAS PÚBLICAS --- */

router.get('/', function(req, res) {
  res.redirect('/login');
});

router.get('/login', function(req, res) {
  res.render('login', { layout: 'layout', error: null });
});

router.post('/login', function(req, res) {
  const { email, password } = req.body;

  // --- DEBUG DE LOGIN (INICIO) ---
  console.log('------------------------------------------------');
  console.log('🔍 INTENTO DE LOGIN');
  console.log('Email recibido:', email);
  console.log('Password recibido:', password);

  const user = usuarioDAO.findByEmail(email);
  console.log('Resultado de búsqueda en BD:', user);

  if (user) {
      if (user.password == password) { 
          console.log('LOGIN CORRECTO');
          req.session.user = user;
          return res.redirect('/dashboard');
      } else {
          console.log('CONTRASEÑA INCORRECTA. Se esperaba:', user.password);
      }
  } else {
      console.log('USUARIO NO ENCONTRADO');
  }
  console.log('------------------------------------------------');
  // --- DEBUG DE LOGIN (FIN) ---

  res.render('login', { layout: 'layout', error: 'Credenciales incorrectas' });
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/login');
});

/* --- RUTAS PRIVADAS (DASHBOARD) --- */

router.get('/dashboard', authMiddleware, function(req, res) {
    // Recoger filtros de la URL (query params)
    const filtros = {
        plataforma: req.query.plataforma || '',
        estado: req.query.estado || '',
        genero: req.query.genero || ''
    };

    // Obtener juegos filtrados
    const juegos = videojuegoDAO.findAllByUsuarioId(req.session.user.id, filtros);

    res.render('dashboard', { 
        layout: 'layout-admin',
        title: 'Mi Colección',
        juegos: juegos,
        filters: filtros
    });
});

/* --- CRUD VIDEOJUEGOS --- */

router.post('/videojuegos/crear', authMiddleware, function(req, res) {
    const { titulo, plataforma, genero, estado } = req.body;
    
    // Validación mínima
    if(titulo && plataforma && estado) {
        videojuegoDAO.create(titulo, plataforma, genero, estado, req.session.user.id);
    }
    
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.json({ success: true });
    }
    res.redirect('/dashboard');
});

router.post('/videojuegos/editar', authMiddleware, function(req, res) {
    const { id, titulo, plataforma, genero, estado } = req.body;
    
    videojuegoDAO.update(id, titulo, plataforma, genero, estado, req.session.user.id);
    
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.json({ success: true });
    }
    res.redirect('/dashboard');
});

router.get('/videojuegos/eliminar/:id', authMiddleware, function(req, res) {
    videojuegoDAO.delete(req.params.id, req.session.user.id);
    res.redirect('/dashboard');
});

module.exports = router;