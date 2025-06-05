/// <reference types="cypress" />

describe('Basic Cypress Test Suite', () => {
  beforeEach(() => {
    // Visit a website before each test
    cy.visit('https://example.com')
    // Start the virtual screen reader
    cy.startVirtualScreenReader()
  })

  afterEach(() => {
    // Stop the virtual screen reader after each test
    cy.stopVirtualScreenReader()
  })

  it('should have the correct title', () => {
    cy.title().should('include', 'Example Domain')
  })

  it('should have a heading', () => {
    cy.get('h1').should('be.visible')
    cy.get('h1').should('contain', 'Example Domain')
  })

  it('should have a paragraph with text', () => {
    cy.get('p').should('be.visible')
    cy.get('p').should('contain', 'This domain is for use in illustrative examples')
  })
})
