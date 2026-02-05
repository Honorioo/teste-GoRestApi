const { faker } = require("@faker-js/faker");

let payload;
let postId;
let userId;
let name;
let email;
let commentsId;


describe("Put Api Test", () => {
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
                cy.validarStatusCode(response, 201);
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
                cy.validarStatusCode(response, 201);
                cy.log(JSON.stringify(response.body));
                postId = response.body.id;
            });
        });
    });
    beforeEach('Criação de um comentário para o post', () => {
        payload.post_id = postId;
        payload.name = name;
        payload.email = email;
        payload.body = faker.lorem.paragraph();
            
        cy.postGenericoApi("comments", payload).then((response) => {
            cy.validarStatusCode(response, 201);
            cy.log(JSON.stringify(response.body));
            commentsId = response.body.id;
        });
        
    });
    context("Testes positivos", () => {
        it("CT01 - Atualizar comentário com sucesso", () =>{
            payload.body = faker.lorem.paragraph();

            cy.putGenericoApi("comments", commentsId, payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 200);
            });
        });
    });
    context("Testes negativos", () => {
        it("CT02 - Tentar Atualizar comentário sem informar o body", () =>{
            delete payload.body;

            cy.putGenericoApi("comments", commentsId, payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 400);
            });
        });
        it("CT03 - Tentar Atualizar comentário sem passar o payload", () =>{
            cy.putGenericoApi("comments", commentsId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 400);
            });
        });
        it("CT04 - Tentar Atualizar comentário sem ID", () => {
            payload.title = faker.lorem.sentence();
            payload.body = faker.lorem.paragraph();
        
            cy.putGenericoApi("comments", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
    });
    afterEach('Deletar o comentário criado', () => {
        if (commentsId) {
            cy.deleteGenericoApi("comments", commentsId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 204);
            });
            }else {
                cy.log("Nenhum comentario para deletar");
            }
        });
    afterEach('Deletar o post criado para o usuário', () => {
        if(postId){
            cy.deleteGenericoApi("posts", postId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 204);
            });
        }else{
            cy.log("Nenhum post para deletar");
        }
    });
    afterEach('Deletar o usuário criado para o post', () => {
        if(userId){
            cy.deleteGenericoApi("users", userId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 204);
            });
        }else{
            cy.log("Nenhum usuário para deletar");
        }
    });
});