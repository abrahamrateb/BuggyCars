/// <reference types="cypress" />

context('Invalid Password Flows', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.viewport(1400, 1000)
    })

    afterEach(() => {
        cy.get(':nth-child(3) > .nav-link').click()
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    it('Login User Successfully', () => {
        cy.Login(Cypress.env('loginusername'), Cypress.env('password'))
        cy.ClickLogin()
        cy.get(':nth-child(1) > .nav-link').contains(Cypress.env('customerFirstName'))
        .get(':nth-child(3) > .nav-link').contains('Logout')
      })

      it('Update User Successfully', () => {
        cy.Login(Cypress.env('loginusername'), Cypress.env('password'))
        cy.ClickLogin()
        cy.get(':nth-child(1) > .nav-link').contains(Cypress.env('customerFirstName'))
        .get(':nth-child(2) > .nav-link').click()
        cy.UpdatePhoneNo()
        cy.get('.btn-default').click()
        cy.VerifyUpdate()
        
        
      })

      //Could add more tests here to handle incorrect login flows like we did for registration

    })


    