/// <reference types="cypress" />

context('Invalid Password Flows', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.viewport(1400, 1000)
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

    })


    