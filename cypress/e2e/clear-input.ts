// cypress/e2e/duckduckgo.ts
import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
    cy.visit('http://localhost:5173/')
});

When('I enter text in the search box', () => {
    cy.get('#job-search-input').type('engineer');
});

When("I click a clear input button", () => {
    cy.get('nyc-clear-input-button').click()
});

Then("I should see an empty input field", () => {
    cy.get('#job-search-input').should('have.value', '');
});
