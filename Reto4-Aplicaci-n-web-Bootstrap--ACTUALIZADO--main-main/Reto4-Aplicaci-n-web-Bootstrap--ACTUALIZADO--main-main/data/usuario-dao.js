class UsuarioDAO {
    constructor(db) {
        this.db = db;
    }

    findByEmail(email) {
        const stmt = this.db.prepare("SELECT * FROM usuarios WHERE email = ?");
        return stmt.get(email);
    }

    createUser(email, password) {
        const stmt = this.db.prepare("INSERT INTO usuarios (email, password) VALUES (?, ?)");
        return stmt.run(email, password);
    }
}

module.exports = UsuarioDAO;