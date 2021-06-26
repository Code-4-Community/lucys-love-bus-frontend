describe('Home page', () => {
  it('should display no events text when no events exist', () => {
    cy.visit('http://localhost:3000');
    // mock api, no results for events or announcements

    cy.intercept('/api/v1/events', {
        events: [],
        totalCount: 0,
    });
    cy.intercept('/api/v1/announcements', {
        announcements: [],
        totalCount: 0,
    });
    cy.contains('There are currently no events!');
    cy.contains('There are currently no announcements!');
  });
});
