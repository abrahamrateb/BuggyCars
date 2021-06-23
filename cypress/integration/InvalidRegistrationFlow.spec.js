/// <reference types="cypress" />

context('Invalid Password Flows', () => {
    beforeEach(() => {
      cy.visit('/register')
      cy.viewport(1400, 1000)
    })
  
    var shortPassword = 'Test!2'
    var shortPasswordError = 'InvalidPasswordException: Password did not conform with policy: Password not long enough'
    var nonNumericPassword = 'TestTest'
    var nonNumericPasswordError = 'InvalidPasswordException: Password did not conform with policy: Password must have numeric characters'
    var numericPassword = '12341234'
    var numericPasswordError ='InvalidPasswordException: Password did not conform with policy: Password must have lowercase characters'
    var misMatchedPassword = 'Passwords do not match'

    it('Register User With Invalid Password Length', () => {
        cy.InvalidRegistration(shortPassword, shortPasswordError)
      })

    it('Register User With Alphabetic Only Password', () => {
        cy.InvalidRegistration(nonNumericPassword, nonNumericPasswordError)
      })

      it('Register User With Numeric Only Password', () => {
        cy.InvalidRegistration(numericPassword, numericPasswordError)
      })

      it('Register User With mistMatched Passwords', () => {

        cy.get('#username').type('Login').get('#firstName').type('Some').get('#lastName').type('Guy')
        .get('#password').type(numericPassword).get('#confirmPassword').type('1234').get(':nth-child(5) > .alert').contains(misMatchedPassword)

      })
    })


    