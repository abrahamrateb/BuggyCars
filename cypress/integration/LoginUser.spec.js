/// <reference types="cypress" />

context('Invalid Password Flows', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.viewport(1400, 1000)
    })

    it('Login User Successfully', () => {
        cy.get('.input-sm').type(Cypress.env('loginusername')).get('[name="password"]').type(Cypress.env('password'))
        cy.get('.btn-success').click()
        cy.get(':nth-child(1) > .nav-link').contains(Cypress.env('customerFirstName'))
        .get(':nth-child(3) > .nav-link').contains('Logout')
      })

      //Could add more tests here to handle incorrect login flows like we did for registration

    })


    