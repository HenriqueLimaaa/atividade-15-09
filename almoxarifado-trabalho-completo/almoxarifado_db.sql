CREATE DATABASE IF NOT EXISTS almoxarifado_db;
USE almoxarifado_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(30) NOT NULL DEFAULT 'operador'
);

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(120) NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    unidade VARCHAR(20) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    estoque_minimo INT NOT NULL DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    tipo ENUM('ENTRADA','SAIDA') NOT NULL,
    quantidade INT NOT NULL,
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacao VARCHAR(255),
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT IGNORE INTO usuarios (nome, usuario, senha, perfil) VALUES
('Administrador', 'admin', '1234', 'admin'),
('Lucas', 'lucas', '1234', 'operador'),
('Operador', 'operador', '1234', 'operador');

INSERT IGNORE INTO produtos (codigo, nome, categoria, unidade, quantidade, estoque_minimo) VALUES
('MAT-001', 'Papel A4', 'Escritório', 'pacote', 18, 10),
('MAT-002', 'Caneta azul', 'Escritório', 'un', 7, 10),
('MAT-003', 'Luva de proteção', 'EPI', 'par', 25, 8),
('MAT-004', 'Cabo USB', 'Informática', 'un', 12, 5);
