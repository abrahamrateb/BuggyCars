/// <reference types="cypress" />

context('Invalid Password Flows', () => {
    beforeEach(() => {
      cy.visit('/register')
      cy.viewport(1400, 1000)
    })

    it('Register User Successfully', () => {
        cy.FillOutRegistration(Cypress.env('username'), Cypress.env('password'))
        cy.get('.btn-default').should('be.enabled')
        cy.ClickRegister()
        cy.get('.result').should('eq', 'Registration is successful')
      })

      //Could add another test here to test the error message when user has already been successfully used

    })


    