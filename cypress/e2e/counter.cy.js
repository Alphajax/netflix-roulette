describe('Counter', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  test('renders initial value', () => {
    cy.get('h1').should('have.text', '7')
  })

  test('increments the displayed value on "Increment" click', () => {
    cy.contains('button', 'Increment').click()
    cy.get('h1').should('have.text', '8')
  })

  test('decrements the displayed value on "Decrement" click', () => {
    cy.contains('button', 'Decrement').click()
    cy.get('h1').should('have.text', '6')
  })

  test('handles multiple increments and decrements correctly', () => {
    cy.contains('button', 'Increment').click().click()
    cy.get('h1').should('have.text', '9')
    cy.contains('button', 'Decrement').click()
    cy.get('h1').should('have.text', '8')
  })
})