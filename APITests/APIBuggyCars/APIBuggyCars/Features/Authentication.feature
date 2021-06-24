@Auth
Feature: Authentication

@Login
Scenario: Login a user successfully and obtain token
	Given I login with username "AbrahamDemo1"
	And I login with password "Test!234"
	Then I can login successfully
	And I can output the bearer token




