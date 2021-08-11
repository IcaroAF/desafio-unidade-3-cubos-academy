const conexao = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const {nome, email, senha, nome_loja} = req.body;

    if(!nome){
        return res.status(400).json("O campo nome é obrigatório");
    }
    if(!email){
        return res.status(400).json("O campo email é obrigatório");
    }
    if(!senha){
        return res.status(400).json("O campo senha é obrigatório");
    }
    if(!nome_loja){
        return res.status(400).json("O campo nome_loja é obrigatório");
    }

    try {
        const checaEmailQuery = 'SELECT  * FROM usuarios where email = $1';
        const { rowCount: emailCadastrado} = await conexao.query(checaEmailQuery, [email]);

        if(emailCadastrado>0){
            return res.status(400).json("O e-mail informado já está cadastrado");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const query = "INSERT INTO usuarios (nome, email, senha, nome_loja) VALUES ($1, $2, $3, $4)";
        const usuarioCadastrado = await conexao.query(query, [nome, email, senhaCriptografada, nome_loja]);

        if(usuarioCadastrado.rowCount === 0){
            return res.status(400).json("Não foi possível cadastrar o usuário.");
        }

        return res.status(200).json("Usuário cadastrado com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const perfilUsuario = async (req, res) => {
    const { usuario } = req;

    try {
        const queryDoPerfil = 'SELECT id, nome, nome_loja, email FROM usuarios WHERE id = $1'; 
        const perfil = await conexao.query(queryDoPerfil, [usuario.id]);

        return res.status(200).json(perfil.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
 
};

module.exports = {
    cadastrarUsuario,
    perfilUsuario
}