const { faker } = require("@faker-js/faker");

let userId;
let commentId;
let postId;
let name;
let email;

describe("Delete Api Test", () => {
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
    beforeEach('Criação de um comentário para o post', () => {
        cy.fixture("commentsFixture/bodyComments").then((body) => {
            const postPayload = {...body};
            postPayload.post_id = postId;
            postPayload.name = name;
            postPayload.email = email;
            postPayload.body = "Esse non sapiente. Blanditiis illo quasi. Veritatis doloremque rerum. Et odit veritatis."

            cy.postGenericoApi("comments", postPayload).then((response) => {
                cy.log(JSON.stringify(response.body));
                commentId = response.body.id;
            });
        });
    });
    
    context("Testes positivos", () => {
        it("CT01 - Deletar commentário com sucesso", () =>{
            cy.deleteGenericoApi("comments", commentId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 204);
            });
        });
    });
    context("Testes negativos", () => {
        it("CT02 - Tentar deletar commentário com ID inválido", () =>{
            cy.deleteGenericoApi("comments", 999999).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT03 - Tentar deletar commentário com ID com caractere especial", () =>{
            cy.deleteGenericoApi("comments", "@#$%¨&*").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT04 - Tentar deletar commentário com ID vazio", () =>{
            cy.deleteGenericoApi("comments").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
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