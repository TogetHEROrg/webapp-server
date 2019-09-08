class Usuarios {
	constructor(dao) {
		this.dao = dao
	}

	create(tipo, nombre, clave, telefono) {
		return this.dao.run(`INSERT INTO Usuarios (Tipo, Nombre, Clave, Telefono, FirebaseToken)
			VALUES (?, ?, ?, ?, '')`, [tipo, nombre, clave, telefono);
	}

	delete(id) {
		return this.dao.run(`DELETE FROM Usuarios WHERE Id = ?`, [id]);
	}

	getById(id) {
		return this.dao.get(`SELECT * FROM Usuarios WHERE Id = ?`, [id]);
	}

	getAll() {
		return this.dao.all(`SELECT * FROM Usuarios`);
	}

	getByUserPass(user, pass) {
		return this.dao.get(`SELECT * FROM Usuarios WHERE Nombre = ? AND Clave = ?`, [user, pass]);	
	}

	setToken(user, token) {
		return this.dao.run(`UPDATE Usuarios SET FirebaseToken = ? WHERE id = ?`, [token, user]);
	}
}

module.exports = Usuarios;