# BuggyCars

## Cypress UI Tests

To run these on your machine or via a pipeline you will need to have the relevant pre-reqs to run Cypress. 
Find the latest container [here on Docker Hub](https://hub.docker.com/u/cypress) or if setting up locally use the [official Cypress documenation](https://docs.cypress.io/guides/getting-started/installing-cypress#Switching-browsers)

You will in short need: 
 * Node.js installed
 * npm/nvm 
 * Run `npm install` (from the folder that contains your package-lock.json)
 * Cypress Installed

If all the above are installed, then you must be in the root folder (where your cypress.json) file is. 

And you can run the tests using `cypress run` or `npm test`
OR if you wanna watch the tests you can use `cypress run --headed`

The output of the test (if run locally) will be in the cypress > videos folder on your local machine. 
In the pipeline you must connect the reporting to a tool like ReportPortal or Cypress Dashboard.

## Specflow/RestSharp API Tests

To run these you'll need to have
 * [dotnet core sdk](https://dotnet.microsoft.com/download) installed ideally version 3.1 or later.

Before you run the tests you need to be in the APIBuggyCars folder (this is the same whether you're running from a container in the pipeline or local)

You can run this in your local windows by running `dotnet test`

If you want to only run a subset of tests like for the User tag, then you can use `dotnet test --filter TestCategory=User`

In the pipeline you'll want to also run `dotnet restore` in a previous step to download all the required dependencies.


