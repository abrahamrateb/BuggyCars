/// <reference types="cypress" />

context('Invalid Password Flows', () => {
    beforeEach(() => {
      cy.visit('/register')
      cy.viewport(1400, 1000)
    })
  
    var today = new Date();
    var hh = String(today.getHours())
    var min = String(today.getMinutes())
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var shortPassword = 'Test!2'
    var shortPasswordError = 'InvalidPasswordException: Password did not conform with policy: Password not long enough'
    var nonNumericPassword = 'TestTest'
    var nonNumericPasswordError = 'InvalidPasswordException: Password did not conform with policy: Password must have numeric characters'
    var numericPassword = '12341234'
    var numericPasswordError ='InvalidPasswordException: Password did not conform with policy: Password must have lowercase characters'
    var misMatchedPassword = 'Passwords do not match'

    it('Register User With Invalid Password Length', () => {

        cy.log(hh + min + dd + mm)

        cy.get('#username').type(hh + min + dd + mm).get('#firstName').type('Some' + hh).get('#lastName').type('Guy' + min)
        .get('#password').type(shortPassword).get('#confirmPassword').type(shortPassword).get('.btn-default').click()
        .get('.result').contains(shortPasswordError)

      })

    it('Register User With Alphabetic Only Password', () => {

        cy.get('#username').type(hh + min + dd + mm).get('#firstName').type('Some' + hh).get('#lastName').type('Guy' + min)
        .get('#password').type(nonNumericPassword).get('#confirmPassword').type(nonNumericPassword).get('.btn-default').click()
        .get('.result').contains(nonNumericPasswordError)

      })

      it('Register User With Numeric Only Password', () => {

        cy.get('#username').type(hh + min + dd + mm).get('#firstName').type('Some' + hh).get('#lastName').type('Guy' + min)
        .get('#password').type(numericPassword).get('#confirmPassword').type(numericPassword).get('.btn-default').click()
        .get('.result').contains(numericPasswordError)

      })

      it('Register User With mistMatched Passwords', () => {

        cy.get('#username').type(hh + min + dd + mm).get('#firstName').type('Some' + hh).get('#lastName').type('Guy' + min)
        .get('#password').type(numericPassword).get('#confirmPassword').type('1234').get(':nth-child(5) > .alert').contains(misMatchedPassword)

      })
    })


    