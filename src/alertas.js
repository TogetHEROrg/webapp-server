class Alertas {
	constructor(dao) {
		this.dao = dao
	}

	create(tipo, fecha, descripcion, usuario, telefono, longitud, latitud) {
		return this.dao.run(`INSERT INTO Alertas (Tipo, Fecha, Descripcion, Usuario, UbicacionLongitud, UbicacionLongitud, Telefono)
			VALUES (?, ?, ?, ?, ?, ?, ?)`, [tipo, fecha, descripcion, usuario, longitud, latitud, telefono]);
	}

	delete(id) {
		return this.dao.run(`DELETE FROM Alertas WHERE Id = ?`, [id]);
	}

	getById(id) {
		return this.dao.get(`SELECT * FROM Alertas WHERE Id = ?`, [id]);
	}

	getAll() {
		return this.dao.all(`SELECT * FROM Alertas`);
	}
}

module.exports = Alertas;