# 📌 Teste GoRest API

Este projeto é um **teste prático de consumo da API pública GoRest**, desenvolvido com o objetivo de demonstrar conhecimentos em **integração com APIs REST**, organização de código e uso de **variáveis de ambiente (.env)** seguindo boas práticas de segurança.

A API utilizada fornece dados simulados de usuários, posts, comentários e outros recursos, sendo amplamente utilizada para fins educacionais e testes técnicos.

---

## 🔗 API Utilizada

- **GoRest API**  
  https://gorest.co.in/

---

## 🎯 Objetivo do Projeto

- Consumir uma API REST pública  
- Realizar requisições HTTP (GET, POST, PUT e DELETE)  
- Trabalhar com dados no formato JSON  
- Utilizar variáveis de ambiente para configuração sensível  
- Demonstrar boas práticas no consumo de APIs externas  

---

## 🛠️ Tecnologias Utilizadas

- JavaScript  
- Node.js  
- API REST  
- JSON  
- Biblioteca HTTP (Fetch ou Axios)  
- dotenv  

---

## 📂 Estrutura do Projeto

```bash
teste-GoRestApi/
├── src/
│   ├── services/
│   │   └── api.js
│   ├── controllers/
│   └── index.js
├── .env
├── .env.example
├── package.json
├── package-lock.json
└── README.md
```

---

##🔐 Variáveis de Ambiente (.env)
```bash
BASE_URL=https://gorest.co.in/public/v2
AUTH_TOKEN=SEU_TOKEN_AQUI
```
As variáveis são utilizadas da seguinte forma:

BASE_URL → URL base da API GoRest
AUTH_TOKEN → Token de autenticação utilizado no header Authorization

⚠️ O arquivo .env não deve ser versionado.
Utilize o .env.example como referência.

---

🚀 Como Executar o Projeto
1️⃣ Clonar o repositório
```bash
git clone https://github.com/Honorioo/teste-GoRestApi.git
```

2️⃣ Acessar a pasta do projeto
```bash
cd teste-GoRestApi
```

3️⃣ Instalar as dependências
```bash
npm install
```

4️⃣ Criar o arquivo .env
```bash
cp .env.example .env
```

Preencha o .env com sua Base URL e seu Auth Token.

5️⃣ Executar o projeto
```bash
npm start
```
---

##📌 Funcionalidades Implementadas

Consumo da API GoRest

Requisições HTTP autenticadas

Uso de variáveis de ambiente para Base URL e Auth Token

Tratamento básico de respostas e erros

Código organizado e de fácil manutenção

---

##👤 Autor
Desenvolvido por Vinicius Honorio

--

Projeto desenvolvido para fins de estudo e aprendizado.
Sinta-se à vontade para utilizar, adaptar e evoluir.
