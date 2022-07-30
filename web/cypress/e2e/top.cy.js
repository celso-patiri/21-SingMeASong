/// <reference types="cypress" />
describe("top page tests", () => {
  it("should display at most 10 recommendations", () => {
    cy.visit("localhost:3000/top");

    cy.get("article").then(($recommendations) => {
      expect($recommendations).to.have.length.of.at.most(10);
    });
  });
});
