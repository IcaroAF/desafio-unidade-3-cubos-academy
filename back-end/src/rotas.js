const express = require('express');
const usuarios = require('./controllers/usuarios');
const login = require('./controllers/login');
const verificaLogin = require('./filtros/verificadorLogin');

const rotas = express();

//cadastro de usuários
rotas.post('/usuarios', usuarios.cadastrarUsuario);

//faz login do usuário
rotas.post('/login', login.login);

rotas.use(verificaLogin);

module.exports = rotas;