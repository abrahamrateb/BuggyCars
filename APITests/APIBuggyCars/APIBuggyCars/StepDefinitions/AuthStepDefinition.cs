using APIBuggyCars.Context;
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
        private EnvironmentContext _environmentContext;
        private RestClient _client;

        public AuthStepDefinition(ScenarioContext scenarioContext, AuthContext authContext, EnvironmentContext environmentContext)
        {
            _scenarioContext = scenarioContext;
            AuthContext = authContext;
            _environmentContext = environmentContext;
            _client = new RestClient(_environmentContext.BaseUrl + "/oauth/token");

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
            Assert.True(response.StatusCode == HttpStatusCode.OK);
            AuthContext.Token = response.Content;
        }

        [Then(@"I can output the bearer token")]
        public void ThenICanOutputTheBearerToken()
        {
            Console.WriteLine(AuthContext.Token);
        }

    }
}
