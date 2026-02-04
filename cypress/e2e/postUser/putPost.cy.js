const { faker } = require("@faker-js/faker");

let payload;
let postId;
let userId;

describe("Put Api Test", () => {
    beforeEach(() => {
        cy.fixture("userFixture/bodyUser").then((body) => {
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
        it("CT01 - Atualizar post com sucesso", () =>{
            payload.title = faker.lorem.sentence();
            payload.body = faker.lorem.paragraph();

            cy.putGenericoApi("posts", postId, payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 200);
            });
        });
    });
    context("Testes negativos", () => {
        it("CT02 - Tentar Atualizar post sem informar o title", () =>{
            delete payload.title;
            payload.body = faker.lorem.paragraph();

            cy.putGenericoApi("posts", postId, payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 400);
            });
        });
        it("CT03 - Tentar Atualizar post sem informar o body", () =>{
            payload.title = faker.lorem.sentence();
            delete payload.body;

            cy.putGenericoApi("posts", postId, payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 400);
            });
        });
        it("CT04 - Tentar Atualizar post sem passar o payload", () =>{
            cy.putGenericoApi("posts", postId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 400);
            });
        });
        it("CT05 - Tentar Atualizar post sem ID", () => {
            payload.title = faker.lorem.sentence();
            payload.body = faker.lorem.paragraph();
        
            cy.putGenericoApi("posts", payload).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
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