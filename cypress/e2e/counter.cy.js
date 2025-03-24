describe('Counter Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Test that component renders initial value provided in props', () => {
    cy.get('h1').should('have.text', '7')
  })

  it('Test that a click event on "increment" button increments the displayed value', () => {
    cy.contains('button', 'Increment').click()
    cy.get('h1').should('have.text', '8')
  })

  it('Test that a click event on "decrement" button decrements the displayed value', () => {
    cy.contains('button', 'Decrement').click()
    cy.get('h1').should('have.text', '6')
  })

  it('handles multiple increments and decrements correctly', () => {
    cy.contains('button', 'Increment').click().click()
    cy.get('h1').should('have.text', '9')
    cy.contains('button', 'Decrement').click()
    cy.get('h1').should('have.text', '8')
  })
})