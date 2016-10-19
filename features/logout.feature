Feature: Logout
    As a registered user
    I want to have an opportunity to log out
    So that nobody can see my stuff from that machine

    Scenario: Successful log out
        Given I am signed in
        When I click 'logout' link
        And I am on '/users/profile' page
        Then I should be redirected to '/login'
