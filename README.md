📌 Teste GoRest API

Este projeto é um teste prático de consumo da API pública GoRest, desenvolvido com o objetivo de demonstrar conhecimentos em integração com APIs REST, manipulação de requisições HTTP e organização de um projeto voltado a testes e estudos.

A API utilizada fornece dados simulados de usuários, posts, comentários e outros recursos, sendo amplamente empregada para fins educacionais e de validação técnica.

🔗 API Utilizada

GoRest API

Documentação oficial:
👉 https://gorest.co.in/

🎯 Objetivo do Projeto

Consumir uma API REST pública

Realizar requisições HTTP (GET, POST, PUT e DELETE, conforme implementação)

Trabalhar com dados retornados em formato JSON

Estruturar um projeto simples, porém organizado, para fins de estudo e portfólio

Praticar boas práticas de integração com APIs externas

🛠️ Tecnologias Utilizadas

JavaScript

Node.js

Fetch / Axios (ou biblioteca HTTP utilizada no projeto)

JSON

API REST

(Caso esteja utilizando outra biblioteca ou framework específico, você pode ajustar esta seção facilmente.)

📂 Estrutura do Projeto
teste-GoRestApi/
├── src/
│   ├── services/
│   │   └── api.js
│   ├── controllers/
│   └── index.js
├── package.json
├── package-lock.json
└── README.md


A estrutura foi pensada para manter a separação de responsabilidades, facilitando a leitura e manutenção do código.

🚀 Como Executar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/Honorioo/teste-GoRestApi.git

2️⃣ Acessar a pasta do projeto
cd teste-GoRestApi

3️⃣ Instalar as dependências
npm install

4️⃣ Executar o projeto
npm start

🔐 Autenticação

A API GoRest exige Token de autenticação para algumas rotas (como criação, edição ou exclusão de dados).

Exemplo de uso do token no header:

Authorization: Bearer SEU_TOKEN_AQUI


⚠️ Importante:
Nunca versionar tokens reais no repositório. Utilize variáveis de ambiente (.env) quando necessário.

📌 Funcionalidades Implementadas

Consumo de dados da API GoRest

Requisições HTTP para endpoints públicos

Tratamento de respostas e erros

Organização de código voltada para escalabilidade

📈 Possíveis Melhorias Futuras

Implementação de testes automatizados

Criação de variáveis de ambiente com .env

Separação completa em camadas (Service, Controller, Repository)

Documentação de endpoints consumidos

Implementação de logs e tratamento avançado de erros

👤 Autor

Desenvolvido por Vinicius Honório
🔗 GitHub: https://github.com/Honorioo

📄 Licença

Este projeto foi desenvolvido para fins de estudo e aprendizado.
Sinta-se à vontade para utilizar, adaptar e evoluir o código.
