const express = require('express');
const usuarios = require('./controllers/usuarios');

const rotas = express();

//cadastro de usuários
rotas.post('/usuarios', usuarios.cadastrarUsuario);

module.exports = rotas;