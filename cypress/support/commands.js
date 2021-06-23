// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

var today = new Date();
var hh = String(today.getHours())
var min = String(today.getMinutes())
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');

Cypress.Commands.add('InvalidRegistration', (password, passwordError) => {
    cy.get('#username').type(hh + min + dd + mm).get('#firstName').type('Some' + hh).get('#lastName').type('Guy' + min)
    .get('#password').type(password).get('#confirmPassword').type(password).get('.btn-default').click()
    .get('.result').contains(passwordError)
})

Cypress.Commands.add('FillOutRegistration', (username, password) => {
    cy.get('#username').type(`${username}${hh}${dd}${mm}`).get('#firstName').type(`Some${hh}`).get('#lastName').type(`Guy${min}`)
    .get('#password').type(password).get('#confirmPassword').type(password)
})

Cypress.Commands.add('ClickRegister', (username, password) => {
    cy.get('.btn-default').click()
})

Cypress.Commands.add('Login', (username, password) => {
    cy.get('.input-sm').type(username).get('[name="password"]').type(password)
})

Cypress.Commands.add('ClickLogin', () => {
    cy.get('.btn-success').click()
})


