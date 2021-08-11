const express = require('express');
const usuarios = require('./controllers/usuarios');
const login = require('./controllers/login');

const rotas = express();

//cadastro de usuários
rotas.post('/usuarios', usuarios.cadastrarUsuario);

//faz login do usuário
rotas.post('/login', login.login);

module.exports = rotas;