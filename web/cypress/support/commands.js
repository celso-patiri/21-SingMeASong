// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from "@faker-js/faker";

const NUMBER_OF_ENTRIES = 20;

Cypress.Commands.add("randomIndex", () => {
  const min = 0;
  const max = NUMBER_OF_ENTRIES - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
});

Cypress.Commands.add("generateSongs", (filename) => {
  cy.writeFile(`cypress/fixtures/${filename}.json`, {
    songs: Cypress._.times(NUMBER_OF_ENTRIES, () => {
      return {
        name: `${faker.lorem.words(3)}`,
        youtubeUrl: "https://www.youtube.com/watch?v=jnMpu9c_-uQ",
      };
    }),
  });
});

Cypress.Commands.add("createRecommendation", () => {
  cy.visit("localhost:3000");
  const recommendationName = faker.lorem.words(3);

  cy.get("#song-name").type(recommendationName);
  cy.get("#song-url").type("https://www.youtube.com/watch?v=jnMpu9c_-uQ");

  cy.intercept("POST", "/recommendations").as("postSong");
  cy.get("#song-button").click();
  cy.wait("@postSong");

  cy.contains(recommendationName).should("be.visible");
});
