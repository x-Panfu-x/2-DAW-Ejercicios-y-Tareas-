const Database = require('better-sqlite3');

const initializeUsuarios = require('./initialize-usuarios'); 
const initializeVideojuegos = require('./initialize-videojuegos');

class DB {
    static instance = null;

    constructor() {
        if (!DB.instance) {
            this.db = new Database('db.sqlite', { verbose: console.log });
            
       
            try {
                initializeUsuarios(this.db);
                initializeVideojuegos(this.db);
            } catch (e) {
                console.error("Error inicializando tablas:", e.message);
            }
            
            DB.instance = this;
        }
        return DB.instance;
    }

    getConnection() {
        return this.db;
    }
}

module.exports = new DB();