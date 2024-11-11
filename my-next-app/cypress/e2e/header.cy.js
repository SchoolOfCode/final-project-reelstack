describe('Header Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the header title', () => {
    cy.contains('h1', 'Reel Magic').should('be.visible');
  });

  it('should activate the search bar on search button click', () => {
    cy.get('button[aria-label="Open search"]').click();
    cy.get('form').should('be.visible');
  });
});
