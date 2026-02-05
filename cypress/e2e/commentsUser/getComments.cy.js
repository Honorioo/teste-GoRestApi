const massa = require("../../data/massa.json");

describe("Comments API Tests", () => {
    context("Testes positivos", () => {
        it("CT01 - Busca de comments", () => {
            cy.getGenericoApi("comments").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 200);
            });
        });
        it("CT02 - Busca de comment por ID do commentario", () => { 
            cy.getIdGenericoApi("comments", massa.comment.idComment).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 200);
            });
        });
        it("CT03 - Busca de comments por ID do post", () => { 
            cy.getIdGenericoApi("comments", massa.comment.post_id).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 200);
            });
        });
    });
    context("Testes negativos", () => {
        it("CT04 - Busca de comment por ID inválido", () => {
            cy.getIdGenericoApi("comments", "0000000").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT05 - Busca de comment por ID com caractere especial", () => {
            cy.getIdGenericoApi("comments", "@#$%¨&*").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT06 - Busca por id vazio", () => {
            cy.getIdGenericoApi("comments").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
    });
});
