const conexao = require('../conexao');

const listaProdutosUsuario = async (req, res) => {
    const { usuario } = req;

    try {
        const produtos = await conexao.query('SELECT * FROM produtos WHERE usuario_id = $1', [usuario.id]);

        if(produtos.rows.length === 0){
            return res.status(404).json("Usuário não tem produtos cadastrados");
        }

        return res.status(200).json(produtos.rows);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = {
    listaProdutosUsuario,
}