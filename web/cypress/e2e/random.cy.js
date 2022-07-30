/// <reference types="cypress" />
describe("random page tests", () => {
  it("should display 1 recommendation", () => {
    cy.visit("/random");

    cy.get("article").then(($recommendations) => {
      expect($recommendations).to.have.length(1);
    });
  });
});
