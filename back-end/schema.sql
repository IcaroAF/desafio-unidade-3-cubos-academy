CREATE DATABASE market_cubos;

CREATE TABLE IF NOT EXISTS usuarios (
	id serial PRIMARY KEY,
  	nome text NOT NULL,
  	nome_loja text NOT NULL,
  	email text NOT NULL UNIQUE,
  	senha text NOT NULL
);

CREATE TABLE IF NOT EXISTS produtos (
    id serial PRIMARY KEY,
    usuario_id integer NOT NULL,
    nome text NOT NULL,
    estoque integer NOT NULL,
    categoria text,
    preco integer NOT NULL,
    descricao text NOT NULL,
    imagem text
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);
