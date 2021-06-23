/// <reference types="cypress" />

var today = new Date();
var hh = String(today.getHours())
var min = String(today.getMinutes())
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');

context('Invalid Password Flows', () => {
    beforeEach(() => {
      cy.visit('/register')
      cy.viewport(1400, 1000)
    })

    // it('Register User Successfully', () => {
    //     cy.FillOutRegistration(Cypress.env('username'), Cypress.env('password'))
    //     cy.get('.btn-default').should('be.enabled')
    //     cy.ClickRegister()
    //     cy.get('.result').should('eq', 'Registration is successful')
    //   })

      //Could add another test here to test the error message when user has already been successfully used

      //Will combine the testing of Registration AND Voting/Posting a Comment here
      //Wil fail if run more than once a minute
      it('Registering a New User for Voting or Posting a Comment updates feed successfully', () => {
        cy.FillOutRegistration(Cypress.env('username'), Cypress.env('password'))
        cy.get('.btn-default').should('be.enabled')
        cy.ClickRegister().wait(1000)
        cy.get('.result').contains('Registration is successful')
        cy.get('.navbar-brand').click()
        cy.get(':nth-child(2) > .card').click()
        cy.Login(Cypress.env('username') + `${hh}${min}${dd}${mm}`, Cypress.env('password'))
        cy.ClickLogin()
        cy.get('#comment').should('be.enabled').get('.btn').should('be.enabled')
        cy.get('.btn').click()
        cy.get('#comment').type('AbrahamDemo').click()
        cy.get('.card-text').contains('Thank you for your vote')
      })
    })


    