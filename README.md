# S1_R3_R4 - AT3 | API Loja de Equipamentos de Informatica

API REST desenvolvida com TypeScript + Express para gerenciamento de uma loja de equipamentos de informatica.

Entidades implementadas:
- Categorias
- Produtos
- Clientes
- Pedidos
- Itens de Pedidos
- Vendedores

---

## 1. Proposta da Atividade e Resultados Esperados

### Proposta
Com base no modelo da atividade S1_R3_R4 - AT2_PBE 2, criar um projeto para loja de informatica com as entidades:
Categorias, Produtos, Clientes, Pedidos, ItensPedidos e Vendedores.

### Resultados esperados
- Aplicar os conceitos de Programacao Orientada a Objetos (POO).
- Estruturar classes com atributos, construtores e metodos.
- Garantir que cada produto tenha ao menos uma imagem vinculada.
- Realizar testes no Insomnia com toda a estrutura criada.

### Como o projeto atende aos resultados
- POO aplicada em Models com encapsulamento, validacoes, construtores e metodos estaticos de criacao/edicao.
- Arquitetura em camadas: Routes -> Controllers -> Services -> Repositories -> Database.
- Validacao de imagem obrigatoria no model de Produto e upload com Multer.
- Colecao do Insomnia disponivel em doc/Insomnia_2026-03-18.yaml.

---

## 2. Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- MySQL (mysql2/promise)
- Multer (upload de imagens)
- Dotenv
- Nodemon (desenvolvimento)

---

## 3. Arquitetura do Projeto

Estrutura principal:

- src/config: leitura/validacao de variaveis de ambiente e configuracao do Multer
- src/controllers: camada HTTP (request/response)
- src/services: regras de negocio e orquestracao
- src/repository: acesso ao banco de dados (SQL)
- src/models: classes de dominio (POO)
- src/routes: definicao dos endpoints
- src/database: conexao com MySQL via pool
- uploads/Images: armazenamento das imagens dos produtos
- doc/db.sql: script de criacao do banco
- doc/Insomnia_2026-03-18.yaml: colecao para testes

Fluxo:

Request HTTP -> Route -> Controller -> Service -> Repository -> MySQL

---

## 4. Entidades e Regras de Negocio (POO)

### Cliente
- Atributos: id, nome, cpf, email
- Regras:
  - nome com tamanho minimo e maximo
  - cpf com 11 caracteres
  - email em formato valido

### Vendedor
- Atributos: id, nome, matricula, email
- Regras:
  - nome valido
  - email valido
  - matricula com 5 caracteres

### Categoria
- Atributos: id, descricao
- Regras:
  - descricao com tamanho minimo e maximo

### Produto
- Atributos: id, nome, valor, idCategoria, vinculoImagem
- Regras:
  - nome valido
  - valor numerico
  - imagem obrigatoria

### Pedido
- Atributos: id, total, data, idCliente, idVendedor
- Regras:
  - total numerico

### Item de Pedido
- Atributos: quantidade, valorUnitario, idPedido, idProduto
- Regras:
  - quantidade > 0
  - valorUnitario > 0

---

## 5. Banco de Dados

O script completo esta em doc/db.sql.

### Tabelas
- Clientes
- Vendedores
- Categorias
- Produtos
- Pedidos
- Itens_Pedidos

### Relacionamentos
- Produtos -> Categorias (FK)
- Pedidos -> Clientes (FK)
- Pedidos -> Vendedores (FK)
- Itens_Pedidos -> Pedidos (FK)
- Itens_Pedidos -> Produtos (FK)

### Funcao SQL
- calcular_total_pedido(id_pedido): soma os itens do pedido.

---

## 6. Upload de Imagem de Produto

Configuracao de upload:
- Campo esperado no form-data: vinculoImagem
- Tipos permitidos: image/jpeg, image/png, image/jpg
- Tamanho maximo: 10 MB
- Pasta de destino: uploads/Images
- Nome do arquivo: hash + nome original

Disponibilizacao das imagens:
- As imagens ficam acessiveis por rota estatica em /produtos/{nome_arquivo}

Exemplo:
- GET http://localhost:8000/produtos/abc123-nome.jpg

---

## 7. Variaveis de Ambiente

Crie o arquivo .env na raiz com:

```env
SERVER_PORT=8000
DB_PORT=3306
DB_HOST=localhost
DB_DATABASE=loja_informatica
DB_USER=root
DB_PASS=sua_senha
```

---

## 8. Como Executar o Projeto

## 8.1 Pre-requisitos
- Node.js instalado
- MySQL instalado e em execucao

## 8.2 Instalar dependencias
```bash
npm install
```

## 8.3 Criar banco e tabelas
Execute o script SQL:
- arquivo: doc/db.sql

Exemplo (CLI MySQL):
```bash
mysql -u root -p < doc/db.sql
```

## 8.4 Rodar a API
Observacao: o package.json atual nao possui scripts prontos de start/dev.

Opcao 1 (direto com ts-node):
```bash
npx ts-node src/server.ts
```

Opcao 2 (desenvolvimento com nodemon):
```bash
npx nodemon --exec ts-node src/server.ts
```

Servidor:
- http://localhost:8000

---

## 9. Endpoints da API

### Clientes
- GET /clientes
- POST /clientes
- PUT /clientes?id={id}
- DELETE /clientes?id={id}

### Vendedores
- GET /vendedores
- POST /vendedores
- PUT /vendedores?id={id}
- DELETE /vendedores?id={id}

### Categorias
- GET /categorias
- POST /categorias
- PUT /categorias?id={id}
- DELETE /categorias?id={id}

### Produtos
- GET /produtos
- POST /produtos (multipart/form-data com imagem)
- PUT /produtos?id={id} (multipart/form-data com imagem)
- DELETE /produtos?id={id}

### Pedidos
- GET /pedidos
- POST /pedidos
- PUT /pedidos?id={id}
- DELETE /pedidos?id={id}

### Itens de Pedidos
- GET /itens-pedidos
- POST /itens-pedidos
- PUT /itens-pedidos?id={id}
- DELETE /itens-pedidos?id={id}

---

## 10. Testes com Insomnia

Arquivo da colecao:
- doc/Insomnia_2026-03-18.yaml

### Passos
1. Abra o Insomnia.
2. Importe o arquivo da colecao YAML.
3. Inicie a API em http://localhost:8000.
4. Execute as requisicoes na ordem recomendada:
   - Criar categoria
   - Criar cliente
   - Criar vendedor
   - Criar produto com imagem (multipart/form-data)
   - Criar pedido
   - Criar item de pedido
   - Consultar os dados com GET

### Campos importantes no Insomnia
- Produto (POST/PUT): enviar arquivo no campo vinculoImagem.
- Pedido (POST): usar id_cliente e id_vendedor.
- Item Pedido (POST): usar idPedido e idProduto.