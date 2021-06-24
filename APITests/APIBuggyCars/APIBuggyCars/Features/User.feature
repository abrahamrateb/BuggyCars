@User
Feature: User

Background: 
	Given I login with username "AbrahamDemo1"
	And I login with password "Test!234"
	Then I can login successfully
	And I can output the bearer token

@Current
Scenario: Get User Details
	When I get the current user details
	Then the first name should be "Some"
	And the last name should be "Guy"

@Profile
Scenario: Get User Profile
	When I get the user profile
	Then the username is "AbrahamDemo1"

@Profile
Scenario: Update User Address
	When I get the user profile
	And I update the address to "Some Street"
	When I get the user profile
	Then the address contains "Some Street"