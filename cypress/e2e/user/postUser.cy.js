import { faker } from "@faker-js/faker";

let payload;
let userId;

describe("User API Tests", () => {
    
    beforeEach(() => {
        cy.fixture("userFixture/bodyUser").then((body) => {
            payload = {...body};
        });
    });
    
    context("Testes positivos", () => {
        it("CT01 - Criar usuário com sucesso", () =>{
            payload.email = faker.internet.email();
            payload.name = faker.person.fullName();
            payload.gender = faker.person.sex();
            payload.status = "active";
            
            cy.postGenericoApi("users", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                userId = response.body.id;
                cy.validarStatusCode(response, 201);
            });
        })
    });
    context("Testes negativos", () => {
        it("CT02 - Tentar criar usuário sem informar o email", () =>{
            delete payload.email;
            payload.name = faker.person.fullName();
            payload.gender = faker.person.sex();
            payload.status = "active";

            cy.postGenericoApi("users", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            });
        });
        it("CT03 - Tentar criar usuário sem informar o nome", () =>{
            payload.email = faker.internet.email();
            delete payload.name;
            payload.gender = faker.person.sex();
            payload.status = "active";

            cy.postGenericoApi("users", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            });
        });
        it("CT04 - Tentar criar usuário sem informar o gender", () =>{
            payload.email = faker.internet.email();
            payload.name = faker.person.fullName();
            delete payload.gender;
            payload.status = "active";

            cy.postGenericoApi("users", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            });
        });
        it("CT05 - Tentar criar usuário sem passar o payload", () =>{
            cy.postGenericoApi("users").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            });
        });
    });

    afterEach(() => {
        it("Deletar usuário criado", () => {
            cy.deleteGenericoApi("users", userId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 204);
            });
        });
    });
});