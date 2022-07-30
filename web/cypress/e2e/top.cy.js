/// <reference types="cypress" />
describe("top page tests", () => {
  it("should display at most 10 recommendations", () => {
    cy.visit("/top");

    cy.get("article").then(($recommendations) => {
      expect($recommendations).to.have.length.of.at.most(10);
    });
  });
});
