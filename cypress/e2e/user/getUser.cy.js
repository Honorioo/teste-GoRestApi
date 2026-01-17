//Casos de testes de usuário

describe('User API Tests', () => {
    it('CT01 - Busca de usuário', () => {
        cy.getApi('users').then((response) => {
            cy.log(JSON.stringify(response.body));
            cy.validarStatusCode(response, 200);
        });
    });
});