const fs = require('fs');
const path = require('path');

const moviesPath = path.join(__dirname, 'movies.json');
const usersPath = path.join(__dirname, 'users.json');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

// PELÍCULAS
function getAllMovies() {
  return readJson(moviesPath);
}

function getMovieById(id) {
  const movies = getAllMovies();
  return movies.find(m => m.id === Number(id));
}

// USUARIOS
function getUserByCredentials(username, password) {
  const users = readJson(usersPath);
  return users.find(
    u => u.username === username && u.password === password
  );
}

module.exports = {
  getAllMovies,
  getMovieById,
  getUserByCredentials
};
