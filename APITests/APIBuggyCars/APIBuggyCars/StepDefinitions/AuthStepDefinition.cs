using APIBuggyCars.Context;
using APIBuggyCars.Models;
using Newtonsoft.Json;
using NUnit.Framework;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using TechTalk.SpecFlow;

namespace APIBuggyCars.StepDefinitions
{
    [Binding]
    public sealed class AuthStepDefinition
    {
        private readonly ScenarioContext _scenarioContext;
        public AuthContext AuthContext;
        public UserContext UserContext;
        private EnvironmentContext _environmentContext;
        private RestClient _client;
        private RestClient _userClient;

        public AuthStepDefinition(ScenarioContext scenarioContext, AuthContext authContext, 
            UserContext userContext, EnvironmentContext environmentContext)
        {
            _scenarioContext = scenarioContext;
            AuthContext = authContext;
            UserContext = userContext;
            _environmentContext = environmentContext;
            _client = new RestClient(_environmentContext.BaseUrl + "/oauth/token");
            _userClient = new RestClient(_environmentContext.BaseUrl + "/users");

        }

        [Given(@"I login with username ""(.*)""")]
        public void GivenILoginWithUsername(string username)
        {
            AuthContext.UserName = username;
        }

        [Given(@"I login with password ""(.*)""")]
        public void GivenILoginWithPassword(string password)
        {
            AuthContext.Password = password;
        }

        [Then(@"I can login successfully")]
        public void ThenICanLoginSuccessfully()
        {
            var post = new RestRequest("", Method.POST);
            post.AddHeader("content-type", "application/x-www-form-urlencoded");
            post.AddParameter("application/x-www-form-urlencoded", $"grant_type=password&username={AuthContext.UserName}&password={AuthContext.Password}", ParameterType.RequestBody);
            var response = _client.Execute(post);
            var tokenresponse = JsonConvert.DeserializeObject<TokenResponse>(response.Content);
            Assert.True(response.StatusCode == HttpStatusCode.OK);
            AuthContext.Token = tokenresponse.access_token;
        }

        [Then(@"I can output the bearer token")]
        public void ThenICanOutputTheBearerToken()
        {
            Console.WriteLine(AuthContext.Token);
        }

        [When(@"I get the current user details")]
        public void WhenIGetTheCurrentUserDetails()
        {
            var request = new RestRequest("/current", Method.GET, DataFormat.Json);
            request.AddHeader("authorization", ("Bearer " + AuthContext.Token));
            var response = _userClient.Execute(request);
            UserContext.User = JsonConvert.DeserializeObject<User>(response.Content);
        }

        [Then(@"the first name should be ""(.*)""")]
        public void ThenTheFirstNameShouldBe(string firstName)
        {
            Assert.AreEqual(firstName, UserContext.User.firstName);
        }

        [Then(@"the last name should be ""(.*)""")]
        public void ThenTheLastNameShouldBe(string lastName)
        {
            Assert.AreEqual(lastName, UserContext.User.lastName);
        }

        [When(@"I get the user profile")]
        public void WhenIGetTheUserProfile()
        {
            var request = new RestRequest("/profile", Method.GET, DataFormat.Json);
            request.AddHeader("authorization", ("Bearer " + AuthContext.Token));
            var response = _userClient.Execute(request);
            UserContext.Profile = JsonConvert.DeserializeObject<ProfileResponse>(response.Content);
        }

        [Then(@"the username is ""(.*)""")]
        public void ThenTheUsernameIs(string username)
        {
            Assert.AreEqual(username, UserContext.Profile.username);
        }

        [When(@"I update the address to ""(.*)""")]
        public void WhenIUpdateTheAddressTo(string address)
        {
            var request = new RestRequest("/profile", Method.PUT, DataFormat.Json);
            request.AddHeader("authorization", ("Bearer " + AuthContext.Token));
            UserContext.Profile.address = address + DateTime.Now.ToString();
            request.AddJsonBody(JsonConvert.SerializeObject(UserContext.Profile));
            var response = _userClient.Execute(request);
            Assert.True(response.StatusCode == HttpStatusCode.OK);
            UserContext.Profile = JsonConvert.DeserializeObject<ProfileResponse>(response.Content);
        }

        [Then(@"the address contains ""(.*)""")]
        public void ThenTheAddressContains(string address)
        {
            Assert.IsTrue(UserContext.Profile.address.Contains(address));
        }

    }
}
