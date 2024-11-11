describe('HeroSection Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Ensure the app is running locally
  });

  it('should display each message in the HeroSection', () => {
    const messages = [
      'Welcome to Reel Magic, the home of movie reviews you can trust.',
      'Join the Reel Revolution!',
      'A new way to share your thoughts.',
      'Reel people, Reel reviews, Reel magic.'
    ];

    messages.forEach((message) => {
      cy.contains('h1', message, { timeout: 10000 }).should('be.visible');
    });
  });

  it('should loop back to the first message after the last message', () => {
    const firstMessage = 'Welcome to Reel Magic, the home of movie reviews you can trust.';
    cy.contains('h1', firstMessage, { timeout: 30000 }).should('be.visible');
  });
});
