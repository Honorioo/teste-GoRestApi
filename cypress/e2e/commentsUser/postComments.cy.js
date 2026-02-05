const { faker } = require("@faker-js/faker");

let payload;
let userId;
let comentario;
let postId;
let name;
let email;

describe("Post API Tests", () => {
    beforeEach(() => {
        cy.fixture("commentsFixture/bodyComments").then((body) => {
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
                name = response.body.name;
                email = response.body.email;
            });
        });
    });
    beforeEach('Criação de um post para o usuário', () => {
        cy.fixture("postFixture/bodyPost").then((body) => {
            const postPayload = {...body};
            postPayload.user_id = userId;
            postPayload.title = faker.lorem.sentence();
            postPayload.body = faker.lorem.paragraph();

            cy.postGenericoApi("posts", postPayload).then((response) => {
                cy.log(JSON.stringify(response.body));
                postId = response.body.id;
            });
        });
    });
    context("Testes positivos", () => {
        it("CT01 - Criar commentario com sucesso", () =>{
            payload.post_id = postId;
            payload.name = name;
            payload.email = email;
            payload.body = faker.lorem.paragraph();
            
            cy.postGenericoApi("comments", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 201);
                comentario = response.body.id;
            });
        });
        afterEach('Deletar o commentario criado', () => {
            if (comentario) {
                cy.deleteGenericoApi("comments", comentario).then((response) => {
                    cy.log(JSON.stringify(response.body));
                    cy.validarStatusCode(response, 204);
                });
            }else {
                cy.log("Nenhum comentario para deletar");
            }
        });
    });
    context("Testes negativos", () => {
        it("CT02 - Tentar criar um comentario sem informar o post_id", () =>{
            delete payload.post_id;
            payload.name = name;
            payload.email = email;
            payload.body = faker.lorem.paragraph();
            
            cy.postGenericoApi("comments", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            });
        });
        it("CT03 - Tentar criar um comentario sem informar o name", () =>{
            payload.post_id = postId;
            delete payload.name;
            payload.email = email;
            payload.body = faker.lorem.paragraph();

            cy.postGenericoApi("comments", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            });
        });
        it("CT04 - Tentar criar um comentario sem informar o email", () =>{
            payload.post_id = postId;
            payload.name = name;
            delete payload.email;
            payload.body = faker.lorem.paragraph();

            cy.postGenericoApi("comments", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            });
        });
        it("CT05 - Tentar criar um comentario sem informar o body", () =>{
            payload.post_id = postId;
            payload.name = name;
            payload.email = email;
            delete payload.body;
            
            cy.postGenericoApi("comments", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            });
        });
        it("CT06 - Tentar criar um comentario sem passar o payload", () =>{
            cy.postGenericoApi("comments").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 422);
            }); 
        });
    });
    afterEach('Deletar o post criado para o comentario', () => {
        if (postId) {
            cy.deleteGenericoApi("posts", postId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 204);
            });
        }else {
            cy.log("Nenhum post para deletar");
        }
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