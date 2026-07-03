class VideojuegoDAO {
    constructor(db) {
        this.db = db;
    }

    findAllByUsuarioId(usuarioId, filtros = {}) {
        let sql = `SELECT * FROM videojuegos WHERE user_id = ?`; // Ojo: user_id debe coincidir con tu DB
        const params = [usuarioId];

        if (filtros.plataforma && filtros.plataforma !== '') {
            sql += ` AND plataforma = ?`;
            params.push(filtros.plataforma);
        }
        if (filtros.genero && filtros.genero !== '') {
            sql += ` AND genero LIKE ?`;
            params.push(`%${filtros.genero}%`);
        }
        if (filtros.estado && filtros.estado !== '') {
            sql += ` AND estado = ?`;
            params.push(filtros.estado);
        }

        sql += ` ORDER BY id DESC`;
        return this.db.prepare(sql).all(...params);
    }

    create(titulo, plataforma, genero, estado, usuarioId) {
        const sql = `INSERT INTO videojuegos (user_id, titulo, plataforma, genero, estado) VALUES (?, ?, ?, ?, ?)`;
        return this.db.prepare(sql).run(usuarioId, titulo, plataforma, genero, estado);
    }

    update(id, titulo, plataforma, genero, estado, usuarioId) {
        const sql = `UPDATE videojuegos SET titulo = ?, plataforma = ?, genero = ?, estado = ? WHERE id = ? AND user_id = ?`;
        return this.db.prepare(sql).run(titulo, plataforma, genero, estado, id, usuarioId);
    }

    delete(id, usuarioId) {
        const sql = `DELETE FROM videojuegos WHERE id = ? AND user_id = ?`;
        return this.db.prepare(sql).run(id, usuarioId);
    }
}

module.exports = VideojuegoDAO;