/// <reference types="cypress" />

context('Invalid Password Flows', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.viewport(1400, 1000)
      cy.clearCookies()
      cy.clearLocalStorage()
    })

    it('Navigate to Popular Makes Page Successfully', () => {
        cy.get(':nth-child(1) > .card').click()
        cy.url().should('include', 'make')
      })

      it('Navigate to Popular Models Page Successfully', () => {
        cy.get(':nth-child(2) > .card').click()
        cy.url().should('include', 'model')
      })

      it('Navigate to Overall Page Successfully', () => {
        cy.get(':nth-child(3) > .card').click()
        cy.url().should('include', 'overall')
      })

      //Only true if a user hasn't voted yet
      it('Navigate to Popular Models Page and Logging in enables the Vote/Comment Button', () => {
        cy.get(':nth-child(2) > .card').click()
        cy.url().should('include', 'model')
        cy.Login(Cypress.env('loginusername'), Cypress.env('password'))
        cy.ClickLogin()
        cy.get('#comment').should('be.enabled').get('.btn').should('be.enabled')
        cy.get(':nth-child(3) > .nav-link').click()
      })

    })


    