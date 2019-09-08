const express = require("express");
const bodyParser = require("body-parser");
const DB = require('./db');
const AlertasDB = require('./alertas');
const UsuariosDB = require('./usuarios');

const app = express();
const db = new DB();
const Alertas = new AlertasDB(db);
const Usuarios = new UsuariosDB(db);

const EMERGENCY = 1;
const ALERT = 2;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// let user = {
//     tipo: '',
//     nombre: '',
//     password: '',
//     telefono: ''
// }

// let respuesta = {
//     error: false,
//     codigo: 200,
//     mensaje: ''
// }

// let alerta = {
//     tipo: '',
//     fecha: '',
//     usuario: '',
//     uLatitud: '',
//     uLongitud: '',
//     telefono: '',
//     descripcion: ''
// }

// app.get('/', (req, res) => {
//     //res.send('Hola mundo');
//     Alertas.create(3, new Date(), "Alerta de prueba", 1, "telefono", "longitud", "latitud")
//     .then(() => {
//     	res.send('Alerta Creada')
//     })
//     .catch((err) => {
//       console.log('Error: ')
//       console.log(JSON.stringify(err))
//     });
// });

app.get('/alertas', (req, res) => {
    Alertas.getAll()
    .then((alertas) => {
        res.send(alertas)
    })
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    });
});

//Creando usuario
app.post('/user', (req, res) => {
    if (!req.body.tipo || !req.body.nombre || !req.body.clave) {
        respuesta = {
        error: true,
        codigo: 400,
        mensaje: 'Falta información: campos "tipo", "nombre" y "password" son obligatorios.'
        }
    } else {
        //validar usuario no se encuentre ya creado, no se encuentre vacio       
        create(req.body.tipo, req.body.nombre, req.body.clave, req.body.telefono)
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'El usuario ha sido creado.'
        }  
    }
    res.send(respuesta); 
})

//Enviar alerta de emergencia
app.post('/emergency', (req, res) => {
    var fecha = new Date();
    Alertas.create(EMERGENCY, fecha, req.body.descripcion, req.body.usuario, req.body.telefono, req.body.uLongitud, req.body.uLatitud);
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ''
    }
    res.send(respuesta);
})

//Enviar alerta de denuncia
app.post('/alert', (req, res) => {
    if (!req.body.usuario || !req.body.descripcion) {
        respuesta = {
            error: true,
            codigo: 400,
            mensaje: 'Faltan datos'
        }
    } else {
        var fecha = new Date();
        Alertas.create(ALERT, fecha, req.body.descripcion, req.body.usuario, req.body.telefono, req.body.uLongitud, req.body.uLatitud);
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: ''
        };   
    }
    res.send(respuesta)
})

// // app.post('/login', (req, res) => {
//     // if (!req.body.user|| !req.body.password) {
//         respuesta = {
//             error: true,
//             codigo: 400,
//             mensaje: 'Falta información: campos "nombre" y "password" son obligatorios'
//         }
//     } else {
//         respuesta = {
//             error: false,
//             codigo: 200,
//             mensaje: ''
//         }
//     }
//     res.send(respuesta);
// })


app.listen(3001, () => {
    console.log('Se levanto en 3001');    
});