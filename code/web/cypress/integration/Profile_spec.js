/* eslint-disable no-undef */

describe('Home Page', () => {

  //beforeEach here for fixtures?

  it('displays the user profile', () => {
    // tests have not been broken up due to the buggy nature of the server (lines 10-15 don't consistenly run)


    // SETUP
    cy.visit('http://localhost:3000/user/login')
    cy.get('input').first().type('user@crate.com')
    cy.get('input').eq(1).type('123456')
    cy.get('button').eq(1).click()
    cy.wait(1000)
    cy.get('a').last().click()

    // MY PROFILE
    cy.get('H3').first().should('have.text', 'My profile')
    cy.get('.profile-image').should('have.attr', 'style', 'height: 250px; width: 250px; background-repeat: no-repeat; background-size: cover; background-position: center center;')
    cy.get('H4').first().should('have.text', 'The User')
    cy.get('p').first().should('have.text', 'User Description: ')
    cy.get('p').eq(1).should('have.text', 'Email Address: user@crate.com')
    cy.get('p').eq(2).should('have.text', 'Shipping Address:  , ,  ')
    cy.get('button').first().should('have.text', 'Update Profile')
    cy.get('button').eq(1).should('have.text', 'Subscriptions')
    cy.get('button').eq(2).should('have.text', 'Logout')

    // UPDATE PROFILE

    // MY ORDERS
    cy.get('H3').eq(1).should('have.text', 'My orders')

    // CURRENT ORDERS
    // need to add a test for current orders by going and adding a subscription here

    // PAST ORDERS
    cy.get('H4').eq(2).should('have.text', 'Past Orders')
    cy.get('H4').eq(3).should('have.text', 'T-Shirt for Men - Grey')
    cy.get('p').eq(3).should('have.attr', 'style', 'padding: 2em 3em 0px;')
    cy.get('p').eq(4).should('have.text', 'Description: A very nice grey t-shirt for men.')
    cy.get('p').eq(5).should('have.text', 'Order Number: 1616449062163')
    cy.get('p').eq(6).should('have.text', 'Product Status: Kept')

    cy.get('H4').eq(4).should('have.text', 'Watch for Men')
    cy.get('p').eq(7).should('have.attr', 'style', 'padding: 2em 3em 0px;')
    cy.get('p').eq(8).should('have.text', 'Description: A very nice watch for men.')
    cy.get('p').eq(9).should('have.text', 'Order Number: 1616449062163')
    cy.get('p').eq(10).should('have.text', 'Product Status: Returned')

  })

  
})