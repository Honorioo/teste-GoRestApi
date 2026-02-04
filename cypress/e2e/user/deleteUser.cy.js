import { faker } from "@faker-js/faker";

let payload;
let userId;

describe("User API Tests", () => {
    
    beforeEach(() => {
        cy.fixture("userFixture/bodyUser").then((body) => {
            payload = {...body};
        });
    });
    beforeEach(() => {
        payload.email = faker.internet.email();
        payload.name = faker.person.fullName();
        payload.gender = faker.person.sex();
        payload.status = "active";        

        cy.postGenericoApi("users", payload).then((response) => {
            userId = response.body.id;
            cy.validarStatusCode(response, 201);
        });
    });
    
    context("Testes positivos", () => {
        it("CT01 - Deletar usuário com sucesso", () =>{
            cy.deleteGenericoApi("users", userId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 204);
            });
        })
    });
    context("Testes negativos", () => {
        it("CT02 - Tentar deletar usuário inexistente", () =>{
            cy.deleteGenericoApi("users", "0000000").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT03 - Tentar deletar usuário com caractere especial no ID", () =>{
            cy.deleteGenericoApi("users", "@#_)(<").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT04 - Tentar deletar usuário sem informar o ID", () =>{
            cy.deleteGenericoApi("users", "").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
    });
});