# BuggyCars

## TEST APPROACH

We're going to break this page into different flows/journeys, different pages and UI/API aspects. We are going to omit performance testing as it's trivial in this case, apart from highlighting a possible DDoS defect in the Profile page, and also mentioning that should any of these endpoints be covered or limits be found (such as max possible registration or login load on the server, this can be done by wrapping up those calls into a .jmx file and running it/loading it up with concurrent users and concurrent calls on JMeter or Blazemeter. As others ARE using this site for their assessment, I won't humour the idea of bringing the site down via a performance test to illusrate a point. 

### Let's first break down the approach into the different flows. There are different things a user can do on this site: 
1. Register 
2. Login/Logout
3. Look at and Update their Details
4. View info on the Top Makes
5. View info on the Top Models
6. View the overall rankings
7. Vote or Comment with a post
8. Go to Social Media via the icons

Most of these can be triggered at both UI and/or API level. Some are more valueable tested at UI (for example navigation), some are more economical to test at API, and some are best covered at both levels for different reasons.  

### The pages we need to test are: 
1. Home/Landing Page
2. Make Page
3. Model Page
4. Overall Page
5. Registration Page
6. Login Page
7. Profile Page

Other concerns for us would be mobile considerations/impact - for example, most pages look great even on an iPhone X but the Model page is horribly formatted when it comes to the comment section. Navigation and flow in between pages is also good to check, for example the header main page link is broken on the Make Pages.

### In terms of UI we can really focus on things such as:
1. Login FLow
2. Registration Flow
3. Navigation between Pages
4. Error/Alert Messaging - the types of things that a user can see or interact with when dealing with our website
5. Authorization flows - when it comes to how you can authorize/authenticate a user there's tons of complex UI flows (for example the PKCE flow) - that stuff is REALLY hard to test at API level without opening up backdoors for security threats.

### In terms of API we can really focus on: 
1. The data flow between Client and Server
2. The correct manipulation of data
3. Error handling at an API level (negative flows like BadRequests, Invalid Entity/422 responses/etc
4. The actual data and mappings and models being passed correctly all around the place. 

## Cypress UI Tests

To run these on your machine or via a pipeline you will need to have the relevant pre-reqs to run Cypress. 
Find the latest container [here on Docker Hub](https://hub.docker.com/u/cypress) or if setting up locally use the [official Cypress documenation](https://docs.cypress.io/guides/getting-started/installing-cypress#Switching-browsers)

You will in short need: 
 * Node.js installed
 * npm/nvm 
 * Run `npm install` (from the folder that contains your package-lock.json)
 * Cypress Installed

1. If all the above are installed, then open up your command prompt and navigate to the root folder (where your cypress.json) file is. 
2. And you can run the tests using `cypress run` or `npm test`
OR if you wanna watch the tests you can use `cypress run --headed` *If cypress run is unrecognized try running npx cypress run instead*
3. The output of the test (if run locally) will be in the cypress > videos folder on your local machine. 
In the pipeline you must connect the reporting to a tool like ReportPortal or Cypress Dashboard.

## Specflow/RestSharp API Tests

To run these you'll need to have
 * [dotnet core sdk](https://dotnet.microsoft.com/download) installed ideally version 3.1 or later.

1. Before you run the tests you need to be in the APIBuggyCars folder (this is the same whether you're running from a container in the pipeline or in command prompt if running on your local)
2. You can run this in your local windows by running `dotnet test`
3. If you want to only run a subset of tests like for the User tag, then you can use `dotnet test --filter TestCategory=User`
4. In the pipeline you'll want to also run `dotnet restore` in a previous step to download all the required dependencies.


