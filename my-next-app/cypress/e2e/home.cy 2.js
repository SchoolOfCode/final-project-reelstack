describe('Home Page', () => {
  it('should load the home page successfully', () => {
    cy.visit('http://localhost:3000'); // Visits your app's homepage
    
    // Add assertions to check for specific text on the homepage
    cy.contains('Reel Magic');
    cy.contains('Popular Movies');
    cy.contains('Check out the hottest reviews from the community...');
  });
});
