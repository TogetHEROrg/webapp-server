const express = require("express");
const DB = require('./db');
const AlertasDB = require('./alertas');

const app = express();
const db = new DB();
const Alertas = new AlertasDB(db);

app.get('/', (req, res) => {
    //res.send('Hola mundo');

    Alertas.create(3, new Date(), "Alerta de prueba", 1, "telefono", "longitud", "latitud")
    .then(() => {
    	res.send('Alerta Creada')
    })
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    });
});

app.get('/alertas', (req, res) => {

    Alertas.getAll()
    .then((alertas) => {
    	let contador = 0
    	alertas.forEach((alerta) => {
    		contador++;
    	})
    	res.send(contador + ' Alertas en la DB')
    })
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    });
});

app.listen(3001, () => {
    console.log('Se levanto en 3001');    
})