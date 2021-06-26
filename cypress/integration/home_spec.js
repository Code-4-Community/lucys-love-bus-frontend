describe('Home page', () => {
  it('should display no events text when no events exist', () => {
    // mock api, no results for events or announcements
    cy.intercept('/api/v1/events', {
      events: [],
      totalCount: 0,
    });

    cy.intercept('/api/v1/announcements', {
      announcements: [],
      totalCount: 0,
    });

    // api calls must be stubbed before visiting anything since they are called immediately after visiting the page
    
    cy.visit('/');

    cy.contains('There are currently no events!');
    cy.contains('There are currently no announcements!');
  });
});
