const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.listen(3001, () => {
    console.log('Se levanto en 3001');    
})