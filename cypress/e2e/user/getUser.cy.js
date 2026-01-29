//Casos de testes de usuário
const massa = require("../../data/massa.json");

//TODO fazer a validação de contrato
describe("User API Tests", () => {
    context("Testes positivos", () => {
        it("CT01 - Busca de usuário", () => {
            cy.getGenericoApi("users").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 200);
            });
        });
        it("CT02 - Busca de usuário por ID", () => { 
            cy.getIdGenericoApi("users", massa.user.idUser).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 200);
            });
        });
    });
    context("Testes negativos", () => {
        it("CT03 - Busca de usuário por ID inválido", () => {
            cy.getIdGenericoApi("users", "0000000").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT04 - Busca de usuário por ID com caractere especial", () => {
            cy.getIdGenericoApi("users", "@#$%¨&*").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT05 - Busca por id vazio", () => {
            cy.getIdGenericoApi("users").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
    });
});
