const { faker } = require("@faker-js/faker");

let userId;
let postId;

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
        it("CT01 - Deletar post com sucesso", () =>{
            cy.deleteGenericoApi("posts", postId).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 204);
            });
        });
    });
    context("Testes negativos", () => {
        it("CT02 - Tentar deletar post com ID inválido", () =>{
            cy.deleteGenericoApi("posts", 999999).then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT03 - Tentar deletar post com ID com caractere especial", () =>{
            cy.deleteGenericoApi("posts", "@#$%¨&*").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
        it("CT04 - Tentar deletar post com ID vazio", () =>{
            cy.deleteGenericoApi("posts").then((response) => {
                cy.log(JSON.stringify(response.body));
                cy.validarStatusCode(response, 404);
            });
        });
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