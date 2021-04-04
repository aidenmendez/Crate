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
    cy.get('H4').first().should('have.text', 'The User')
    cy.get('p').first().should('have.text', 'User Description: ')
    cy.get('p').eq(1).should('have.text', 'Email Address: user@crate.com')
    cy.get('p').eq(2).should('have.text', 'Shipping Address:  , ,  ')
    cy.get('button').first().should('have.text', 'Update Profile')
    cy.get('button').eq(1).should('have.text', 'Subscriptions')
    cy.get('button').eq(2).should('have.text', 'Logout')

    // UPDATE PROFILE
    cy.get('button').first().click()
    cy.get('textarea').click().type('description')
    cy.get('input').eq(1).click().type('address1')
    cy.get('input').eq(2).click().type('address2')
    cy.get('input').eq(3).click().type('city')
    cy.get('input').eq(4).click().type('state')
    cy.get('input').eq(5).click().type('zip')
    cy.get('button').first().click()
    cy.get('p').first().should('have.text', 'User Description: description')
    cy.get('p').eq(1).should('have.text', 'Email Address: user@crate.com')
    cy.get('p').eq(2).should('have.text', 'Shipping Address: address1 address2, city, state zip')

    // PAST ORDERS
    
    cy.get('H4').eq(2).should('have.text', 'Past Orders')
    cy.get('H4').eq(3).should('have.text', 'T-Shirt for Men - Grey')
    cy.get('p').eq(5).should('have.text', 'Description: A very nice grey t-shirt for men.')
    cy.get('p').eq(6).should('have.text', 'Order Number: 1616449062163')
    cy.get('p').eq(7).should('have.text', 'Product Status: Kept')

    cy.get('H4').eq(4).should('have.text', 'Watch for Men')
    cy.get('p').eq(9).should('have.text', 'Description: A very nice watch for men.')
    cy.get('p').eq(10).should('have.text', 'Order Number: 1616449062163')
    cy.get('p').eq(11).should('have.text', 'Product Status: Returned')



    // SUBSCRIBE TO A CREATE
    cy.get('a').eq(5).click()
    cy.get('button').first().click()
    cy.get('a').eq(7).click()
    
    cy.get('H4').eq(2).should('have.text', 'Clothes for Men')
    cy.get('p').eq(5).should('have.text', 'Shipping Address: Confirmed')
    cy.get('p').eq(6).should('have.text', 'Items in Crate: 3')
    cy.get('p').eq(7).should('have.text', 'Delivery Date: ')


    // // CURRENT ORDERS
    // cy.get('a').eq(5).click()
    // cy.get('button').first().click()
    // cy.get('a').eq(7).click()

  })

  
})