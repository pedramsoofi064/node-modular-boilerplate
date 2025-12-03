describe('Health Check API', () => {
  it('should return the correct status for database and app', () => {
    cy.request('GET', 'http://localhost:3000/health')
      .then((response) => {
        // Check that the response status is 200
        expect(response.status).to.eq(200);

        // Check that the response body has the correct structure and values
        expect(response.body).to.have.property('database');
        expect(response.body.database).to.have.property('status', 'up');

        expect(response.body).to.have.property('app');
        expect(response.body.app).to.have.property('status', 'up');
      });
  });
});