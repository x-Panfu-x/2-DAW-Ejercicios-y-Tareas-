module.exports = (db) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS videojuegos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            titulo TEXT NOT NULL,
            plataforma TEXT NOT NULL,
            genero TEXT NOT NULL,
            estado TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES usuarios(id)
        )
    `;
    db.prepare(sql).run();
}