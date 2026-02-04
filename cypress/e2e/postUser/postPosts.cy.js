const { faker } = require("@faker-js/faker");

let payload;
let postId;
let userId;

describe("Post API Tests", () => {
    beforeEach(() => {
        cy.fixture("postFixture/bodyPost").then((body) => {
            payload = {...body};
        });
    });
    beforeEach('Criação de um usuário para o post', () => {
        cy.fixture("userFixture/bodyUser").then((body) => {
            const userPayload = {...body};
            userPayload.email = faker.internet.email();
            userPayload.name = faker.person.fullName();
            userPayload.gender = faker.person.sex();
            userPayload.status = "active";

            cy.postGenericoApi("users", userPayload).then((response) => {
                cy.log(JSON.stringify(response.body));
                userId = response.body.id;
            });
        });
    });
    context("Testes positivos", () => {
        it("CT01 - Criar post com sucesso", () =>{
            payload.user_id = userId;
            payload.title = faker.lorem.sentence();
            payload.body = faker.lorem.paragraph();
            
            cy.postGenericoApi("posts", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 201);
                postId = response.body.id;
            });
        });
        afterEach('Deletar o post criado', () => {
            if (postId) {
                cy.deleteGenericoApi("posts", postId).then((response) => {
                    cy.log(JSON.stringify(response.body));
                    cy.validarStatusCode(response, 204);
                });
            }else {
                cy.log("Nenhum post para deletar");
            }
        });
    });
    context("Testes negativos", () => {
        it("CT02 - Tentar criar post sem informar o user_id", () =>{
            delete payload.user_id;
            payload.title = faker.lorem.sentence();
            payload.body = faker.lorem.paragraph();
            
            cy.postGenericoApi("posts", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            });
        });
        it("CT03 - Tentar criar post sem informar o title", () =>{
            payload.user_id = userId;
            delete payload.title;
            payload.body = faker.lorem.paragraph();
            
            cy.postGenericoApi("posts", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            });
        });
        it("CT04 - Tentar criar post sem informar o body", () =>{
            payload.user_id = userId;
            payload.title = faker.lorem.sentence();
            delete payload.body;
            
            cy.postGenericoApi("posts", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            });
        });
        it("CT05 - Tentar criar post sem passar o payload", () =>{
            cy.postGenericoApi("posts").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            }); 
        });
    });
    afterEach('Deletar o usuário criado para o post', () => {
        if (userId) {
            cy.deleteGenericoApi("users", userId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 204);
            });
        }else {
            cy.log("Nenhum usuário para deletar");
        }
    });

});