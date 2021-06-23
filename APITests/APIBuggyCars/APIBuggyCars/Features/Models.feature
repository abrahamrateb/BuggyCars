@Models
Feature: Models


Scenario: Search for Zonda models
	Given I look for the "Zonda" model
	When I search for model
	Then the model name should be "Zonda"
	And the model make should be "Pagani"
	And the model max speed should be 350

Scenario: Can Search for different models
	Given I look for the "Diablo" model
	When I search for model
	Then the model make should be "Lamborghini"