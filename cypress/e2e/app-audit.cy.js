describe('Cantiere Chiaro audit smoke', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the home screen and support section', () => {
    cy.contains('Ristrutturare, con più').should('be.visible');
    cy.contains('FONTI E VERIFICA').should('be.visible');
  });

  it('updates progress and diary without crashing', () => {
    cy.get('[data-task="0"]').check();
    cy.get('#progress-value').invoke('text').then(value => {
      expect(value.trim()).not.to.eq('0');
    });

    cy.get('#diary-date').type('2026-10-28');
    cy.get('#diary-category').select('decisione');
    cy.get('#diary-title').type('Scelta del fornitore');
    cy.get('#diary-description').type('Abbiamo concordato di richiedere tre preventivi e di verificare le referenze.');
    cy.get('#diary-form button[type="submit"]').click();
    cy.get('#diary-count').should('contain.text', '1 nota');
    cy.contains('Scelta del fornitore').should('be.visible');
  });
});
