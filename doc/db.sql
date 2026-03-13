CREATE DATABASE loja_informatica;

USE loja_informatica;

CREATE TABLE IF NOT EXISTS Clientes (
	id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome_cliente VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    email_cliente VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Vendedores (
	id_vendedor INT PRIMARY KEY AUTO_INCREMENT,
    nome_vendedor VARCHAR(100) NOT NULL,
    matricula VARCHAR(5),
    email_vendedor VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Categorias (
	id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Produtos (
	id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    valorProduto DECIMAL (10,2),
    vinculo_imagem VARCHAR (100),
    id_categoriaFK INT,
    FOREIGN KEY (id_categoriaFK) REFERENCES Categorias (id_categoria)
);


CREATE TABLE IF NOT EXISTS Pedidos (
	id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    valorTotal DECIMAL(10,2),
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_clienteFK INT,
    id_vendedorFK INT,
    FOREIGN KEY (id_clienteFK) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (id_vendedorFK) REFERENCES Vendedores(id_vendedor)
);

CREATE TABLE IF NOT EXISTS Itens_Pedidos (
	id_item INT PRIMARY KEY AUTO_INCREMENT,
	id_pedidoFK INT,
    id_produtoFK INT,
    quantidade INT NOT NULL,
	valorUnitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedidoFK) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_produtoFK) REFERENCES Produtos(id_produto)
);


DELIMITER $$

CREATE FUNCTION calcular_total_pedido(p_id_pedido INT)
RETURNS DECIMAL(10,2)
READS SQL DATA
BEGIN
    DECLARE total DECIMAL(10,2);

    SELECT COALESCE(SUM(ip.quantidade * ip.valorUnitario), 0)
    INTO total
    FROM Itens_Pedidos ip
    WHERE ip.id_pedidoFK = p_id_pedido;

    RETURN total;
END$$

DELIMITER ;