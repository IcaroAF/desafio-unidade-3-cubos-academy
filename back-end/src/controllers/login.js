const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const segredo = require('../segredo');

const login = async (req, res) => {
    const {email, senha} = req.body;

    if(!email || !senha){
        return res.status(400).json("Os campos email e senha são obrigatórios.");
    }

    try {
        const verificaEmailQuery = 'SELECT * FROM usuarios WHERE email = $1';
        const {rows, rowCount} = await conexao.query(verificaEmailQuery, [email]);

        if(rowCount === 0){
            return res.status(400).json("Usuário não encontrado.");
        }

        const usuario = rows[0];

        const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

        if(!senhaVerificada){
            return res.status(400).json("Email e senha não conferem");
        }

        const token = jwt.sign({id: usuario.id}, segredo, { expiresIn: '2h'});

        const {senha: senhaUsuario, ...dadosDoUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosDoUsuario,
            token
        });
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    login
};