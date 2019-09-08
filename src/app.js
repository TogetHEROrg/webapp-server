const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let user = {
    tipo: '',
    nombre: '',
    password: '',
    telefono: ''
}

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
}

let alerta = {
    tipo: '',
    fecha: '',
    usuario: '',
    uLatitud: '',
    uLongitud: '',
    telefono: '',
    descripcion: ''
}

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.post('/user', (req, res) => {
    if (!req.body.tipo || !req.body.nombre || !req.body.password) {
        respuesta = {
        error: true,
        codigo: 400,
        mensaje: 'Falta información: campos "tipo", "nombre" y "password" son obligatorios'
        }
    } else {
        //validar usuario no se encuentre ya creado, no se encuentre vacio       
        user = {
            tipo: req.body.tipo,
            nombre: req.body.nombre,
            password: req.body.password
        };
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Usuario creado'
        }  
    }
    res.send(respuesta); 
})

app.post('/emergency', (req, res) => {
    var fecha = new Date();
    var horaActual = fecha.getHours();
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ''
    }
    res.send(respuesta);
})

app.post('/alert', (req, res) => {
    if (!req.body.usuario || !req.body.descripcion) {
        respuesta = {
            error: true,
            codigo: 400,
            mensaje: 'Faltan datos'
        }
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: ''
        }   
    }
    res.send(respuesta)
})

app.post('/login', (req, res) => {
    if (!req.body.user|| !req.body.password) {
        respuesta = {
            error: true,
            codigo: 400,
            mensaje: 'Falta información: campos "nombre" y "password" son obligatorios'
        }
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: ''
        }
    }
    res.send(respuesta);
})

app.listen(3001, () => {
    console.log('Se levanto en 3001');    
});

