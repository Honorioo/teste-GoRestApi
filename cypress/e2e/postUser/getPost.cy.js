const massa = require("../../data/massa.json");

describe("Post API Tests", () => {
    context("Testes positivos", () => {
        it("CT01 - Busca de posts", () => {
            cy.getGenericoApi("posts").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 200);
            });
        });
        it("CT02 - Busca de post por ID do post", () => { 
            cy.getIdGenericoApi("posts", massa.post.idPost).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 200);
            });
        });
        it("CT03 - Busca de post por ID do usuário", () => { 
            cy.getIdGenericoApi("posts", massa.post.userId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 200);
            });
        });
    });
    context("Testes negativos", () => {
        it("CT04 - Busca de post por ID inválido", () => {
            cy.getIdGenericoApi("posts", "0000000").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT05 - Busca de post por ID com caractere especial", () => {
            cy.getIdGenericoApi("posts", "@#$%¨&*").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT06 - Busca por id vazio", () => {
            cy.getIdGenericoApi("posts").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
    });
});
