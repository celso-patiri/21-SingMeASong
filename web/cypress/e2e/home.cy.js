/// <reference types="cypress" />
describe("home page tests", () => {
  it("should create new recomendation", () => {
    cy.createRecommendation();
  });
});
