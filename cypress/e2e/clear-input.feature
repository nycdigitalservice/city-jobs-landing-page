Feature: Clearing the search input
    Scenario: The search input contains text
      When I enter text in the search box
      And I click a clear input button
      Then I should see an empty input field
