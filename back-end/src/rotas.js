const express = require('express');
const usuarios = require('./controllers/usuarios');
const login = require('./controllers/login');
const produtos = require('./controllers/produtos');
const verificaLogin = require('./filtros/verificadorLogin');

const rotas = express();

//cadastro de usuários
rotas.post('/usuarios', usuarios.cadastrarUsuario);

//faz login do usuário
rotas.post('/login', login.login);

rotas.use(verificaLogin);

//verifica perfil do usuário
rotas.get('/perfil', usuarios.perfilUsuario);

//atualiza perfil do usuário
rotas.put('/perfil', usuarios.atualizaPerfilUsuario);

//lista produtos do usuário
rotas.get('/produtos', produtos.listaProdutosUsuario);

//lista produto do usuário por id
rotas.get('/produtos/:id', produtos.listaProdutoUsuario);

//cadastra produto para o usuário
rotas.post('/produtos', produtos.cadastrarProduto);

//atualiza produto do usuário
rotas.put('/produtos/:id', produtos.atualizarProduto);

//exclui produto do usuário
rotas.delete('/produtos/:id', produtos.excluirProduto);

module.exports = rotas;