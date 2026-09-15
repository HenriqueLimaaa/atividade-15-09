-- Banco: almoxarifado_db
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS movimentacoes;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  usuario TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

CREATE TABLE produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  unidade TEXT NOT NULL,
  estoque_atual INTEGER NOT NULL DEFAULT 0 CHECK (estoque_atual >= 0),
  estoque_minimo INTEGER NOT NULL DEFAULT 0 CHECK (estoque_minimo >= 0)
);

CREATE TABLE movimentacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  produto_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('entrada','saida')),
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  data_movimentacao TEXT NOT NULL,
  FOREIGN KEY (produto_id) REFERENCES produtos(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO usuarios (nome, usuario, senha) VALUES
('Administrador', 'admin', '1234'),
('Lucas', 'lucas', '1234'),
('Operador', 'operador', '1234');

INSERT INTO produtos (codigo, nome, categoria, unidade, estoque_atual, estoque_minimo) VALUES
('CX001', 'Caixa de papelão 30x20', 'Embalagens', 'un', 120, 30),
('FR001', 'Frasco plástico 500ml', 'Frascos', 'un', 50, 20),
('TA001', 'Tampa plástica padrão', 'Tampas', 'un', 15, 20);

INSERT INTO movimentacoes (produto_id, usuario_id, tipo, quantidade, data_movimentacao) VALUES
(1, 1, 'entrada', 120, date('now')),
(2, 1, 'entrada', 50, date('now')),
(3, 2, 'entrada', 15, date('now'));
