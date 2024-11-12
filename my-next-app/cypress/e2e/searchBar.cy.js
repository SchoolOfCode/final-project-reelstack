describe('SearchBar Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('button[aria-label="Open search"]').click(); // Open the search bar
  });

  it('should load search results and highlight items with arrow keys', () => {
    // Step 1: Type the search query and check if results appear
    cy.get('input[placeholder="Search..."]').type('Inception');
    cy.get('ul').should('be.visible'); // Results list should be visible
    cy.get('li').should('have.length.greaterThan', 0); // Confirm results load

    // Step 2: Press the down arrow to trigger the highlight
    cy.get('input[placeholder="Search..."]').type('{downarrow}');
    
    // Step 3: Confirm the first item has `data-testid="highlighted-item"` and contains expected text
    cy.get('[data-testid="highlighted-item"]', { timeout: 8000 }) // Wait for highlighted item to appear
      .should('exist')
      .should('have.attr', 'data-testid', 'highlighted-item')
      .invoke('text')
      .should('contain', 'Inception');
  });
});









