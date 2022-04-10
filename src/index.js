const express = require("express");
const bodyParser = require('body-parser');
const usuarios = require('./usuarios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/usuarios', (req, res) => {
    res.send(usuarios);
})

app.post('/usuarios', (req, res) => {
    const usuario = req.body;
    let nImagen = Math.floor(Math.random() * (12 - 1) + 1);
    let newUsuario = { ...usuario, id: usuarios.length + 1, avatar: `https://reqres.in/img/faces/${nImagen}-image.jpg` }
    usuarios.push(newUsuario);
    res.send(newUsuario);
})

app.get('/usuarios/:id', (req, res) => {
    const email = req.params.id;
    { req.params.id }
    const usuario = usuarios.find(usuario => usuario.email == email);
    if (usuario) res.send([usuario]);
    else res.status(404).send({ mensagem: 'usuario no encontrado' });
})

app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { email, first_name, last_name, avatar } = req.body;
    const usuario = usuarios.find(usuario => usuario.id == id);
    if (usuario) {
        usuario.email = email;
        usuario.first_name = first_name;
        usuario.last_name = last_name;
        usuario.avatar = avatar;
        res.send(usuario);
    } else res.status(404).send({ mensage: 'usuario no encontrado' });
})

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const usuario = usuarios.find(usuario => usuario.id == id);
    if (usuario) {
        usuarios.splice(usuarios.indexOf(usuario), 1);
        res.status(200).send({ mensage: 'usuario eliminado' });
    } else res.status(404).send({ mensagem: 'usuario no encontrado' });
})

app.listen(4000, () => {
    console.log("Server is running on port 3000");
});
