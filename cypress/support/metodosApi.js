Cypress.Commands.add('postGenericoApi', (metodo, payload) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('baseUrl')}/${metodo}`,
        headers: {
            'Authorization': Cypress.env('authorization'),
            'Content-Type': 'application/json'
        },
        body: payload,
        failOnStatusCode: false
    })
});

Cypress.Commands.add('getGenericoApi', (metodo) => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env('baseUrl')}/${metodo}`,
        headers: {
            'Authorization': Cypress.env('authorization'),
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
});

Cypress.Commands.add('getIdGenericoApi', (metodo, id) => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env('baseUrl')}/${metodo}/${id}`,
        headers: {
            'Authorization': Cypress.env('authorization'),
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
});

Cypress.Commands.add('putGenericoApi', (metodo, id, payload) => {
    cy.request({
        method: 'PUT',
        url: `${Cypress.env('baseUrl')}/${metodo}/${id}`,
        headers: {
            'Authorization': Cypress.env('authorization'),
            'Content-Type': 'application/json'
        },
        body: payload,
        failOnStatusCode: false
    })
});

Cypress.Commands.add('deleteGenericoApi', (metodo, id) => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('baseUrl')}/${metodo}/${id}`,
        headers: {
            'Authorization': Cypress.env('authorization'),
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
});