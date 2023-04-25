Feature: Start Workflow

  Scenario: User can start a new workflow
    Given I am on the Ironclad home page and click on Sign In button
    Then I should be redirected to the Ironclad signin page
    When I enter valid credentials and click the signin button
    Then I should be redirected to the Ironclad dashboard
    When I click the "Start workflow" button
    And I enter workflow details for "Contract for Legal Review" and click the submit button
    Then the new workflow should be created successfully
