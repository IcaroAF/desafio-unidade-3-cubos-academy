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

const listaProdutoUsuario = async (req, res) => {
    const { id } = req.params;
    const {usuario} = req;

    try {
        const produto = await conexao.query('SELECT * FROM produtos WHERE id = $1 AND usuario_id = $2', [id, usuario.id]);

        if(produto.rowCount === 0){
            return res.status(404).json("Produto não encontrado.");
        }

        return res.status(200).json(produto.rows[0]);     
    } catch (error) {
        res.status(400).json(error.message);
    }

};

const cadastrarProduto = async (req, res) => {
    const { nome, estoque, categoria, preco, descricao,imagem } = req.body;

    if(!nome){
        return res.status(400).json("O campo nome é obrigatório");
    }
    if(!estoque){
        return res.status(400).json("O campo estoque é obrigatório");
    }
    if(!preco){
        return res.status(400).json("O campo preco é obrigatório");
    }
    if(!descricao){
        return res.status(400).json("O campo descricao é obrigatório");
    }

    const { usuario } = req;

    try {
        const produtoQuery = 'INSERT INTO produtos (usuario_id, nome, estoque, categoria, preco, descricao, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7)';

        const produto = await conexao.query(produtoQuery, [usuario.id, nome, estoque, categoria, preco, descricao, imagem]);

        if(produto.rowCount === 0){
            return res.status(400).json("Não foi possível cadastrar o produto.");
        }

        return res.status(200).json("Produto cadastrado com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }
 }

 const atualizarProduto = async (req, res) => {
     const {nome, estoque, categoria, preco, descricao, imagem} = req.body;
     const { usuario } = req;
     const { id: idProduto } = req.params;

     if(!nome){
         return res.status(404).json("O campo nome é obrigatório")
     }
     if(!estoque){
         return res.status(404).json("O campo estoque é obrigatório")
     }
     if(!preco){
         return res.status(404).json("O campo preco é obrigatório")
     }
     if(!descricao){
         return res.status(404).json("O campo descricao é obrigatório")
     }

     try {
         const produtoExistenteQuery = 'SELECT * FROM produtos WHERE id = $1 AND usuario_id = $2';

         const produtoExistente = await conexao.query(produtoExistenteQuery, [idProduto, usuario.id]);

         if(produtoExistente.rowCount === 0){
             return res.status(404).json("O produto não foi encontrado ou não pertence ao usuário autenticado");
         }

         const produtoQuery = "UPDATE produtos SET nome = $1, estoque = $2, categoria = $3, preco = $4, descricao = $5, imagem = $6 WHERE id = $7 AND usuario_id = $8";

         const produto = await conexao.query(produtoQuery, [nome, estoque, categoria, preco, descricao, imagem, idProduto, usuario.id]);

         if(produto.rowCount === 0){
             return res.status(400).json("Não foi possível atualizar o produto");
         }

         return res.status(200).json("Produto atualizado com sucesso");
     } catch (error) {
         res.status(400).json(error.message);
     }
}

const excluirProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produtoExistenteQuery = 'SELECT * FROM produtos WHERE id = $1 AND usuario_id = $2';

        const produtoExistente = await conexao.query(produtoExistenteQuery, [id, usuario.id]);

        if(produtoExistente.rowCount === 0){
            return res.status(404).json("O produto não foi encontrado ou não pertence ao usuário autenticado");
        }

        const { rowCount } = await conexao.query('DELETE FROM produtos WHERE id = $1', [id]);

        if(rowCount === 0){
            return res.status(400).json("Nao foi possível excluir o produto.");
        }
        } catch (error) {
            return res.status(400).json(error.message);
        }

};



module.exports = {
    listaProdutosUsuario,
    cadastrarProduto,
    listaProdutoUsuario,
    atualizarProduto,
    excluirProduto
}