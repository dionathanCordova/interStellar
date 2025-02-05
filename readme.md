# Interstellar - Explorer na Rede Stellar

Interstellar é uma API que integra com a blockchain **Stellar**, permitindo consultar saldos de contas, transações e blocos (ledgers). O projeto utiliza **Node.js**, **Express** e **Docker**, com documentação via **Swagger**.

## Tecnologias Utilizadas

- **Node.js** - Backend da API
- **Express** - Framework web
- **Axios** - Requisições HTTP
- **Docker & Docker Compose** - Contêinerização da API e do nó Stellar (Horizon)
- **Swagger** - Documentação da API

## Como Executar o Projeto

### Com Docker (Recomendado)

1. Certifique-se de ter **Docker** e **Docker Compose** instalados.
2. Clone o repositório:
   ```sh
   git clone git@github.com:dionathanCordova/interStellar.git
   cd interstellar
   ```
3. Inicie os contêineres:
   ```sh
   docker-compose up -d --build
   ```
4. Acesse a API em `http://localhost:3000`
5. Acesse a documentação Swagger em `http://localhost:3000/api-docs`

### Sem Docker (Manual)

1. Instale o **Node.js** (versão 18+)
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Execute o container da stellar
    ```sh
    docker run -d --name stellar-node -p 8000:8000 --restart unless-stopped stellar/quickstart --testnet
    ```
3. Configure a variável de ambiente:
   ```sh
   export HORIZON_URL=http://localhost:8000
   ```
4. Inicie o servidor:
   ```sh
   npm run start
   ```

## Endpoints da API

### 1. Buscar saldo de uma conta

**GET /account/:address**

- **Parâmetros:**
  - `address` (string, obrigatório): Endereço da conta Stellar
- **Exemplo:** `/account/GCXR3UI33MVQGUMYAQLZXGY2YYDOS33UXPIBGDSUOAMQNZ5EAS4D5OFY`
- **Resposta:**
  ```json
  {
    "account_id": "GCXR3UI33MVQGUMYAQLZXGY2YYDOS33UXPIBGDSUOAMQNZ5EAS4D5OFY",
    "balances": [
      {
        "balance": "871193.6178650",
        "asset_type": "native"
      }
    ],
    "sequence": 3018503015696670
  }
  ```

### 2. Buscar um bloco (ledger)

**GET /ledger/:sequence**

- **Parâmetros:**
  - `sequence` (integer, obrigatório): Número do bloco
- **Exemplo:** `/ledger/973956`
- **Resposta:**
  ```json
  {
    "sequence": 973956,
    "hash": "f102e1925442b7a740789ea64c33e409a39c30b20d93f8f7918ce9d6cf8dc1ab"
  }
  ```

### 3. Buscar uma transação pelo hash

**GET /transaction/:hash**

- **Parâmetros:**
  - `hash` (string, obrigatório): Hash da transação
- **Exemplo:** `/transaction/f102e1925442b7a740789ea64c33e409a39c30b20d93f8f7918ce9d6cf8dc1ab`
- **Resposta:**
  ```json
  {
    "id": "f102e1925442b7a740789ea64c33e409a39c30b20d93f8f7918ce9d6cf8dc1ab",
    "successful": true,
    "ledger": 962496
  }
  ```

## Estrutura do Projeto

```
interstellar/
├── src/
│   ├── routes/
│   │   ├── account.js
│   │   ├── transaction.js
│   │   ├── ledger.js
│   ├── app.js
│   ├── server.js
├── swagger.json
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Documentação da API
A API é documentada com **Swagger** e pode ser acessada em:

📜 `http://localhost:3000/api-docs`

## Licença
Este projeto está sob a licença MIT. Sinta-se livre para contribuir! 🚀

