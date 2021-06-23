using APIBuggyCars.Context;
using APIBuggyCars.Models;
using Newtonsoft.Json;
using NUnit.Framework;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechTalk.SpecFlow;

namespace APIBuggyCars.StepDefinitions
{
    [Binding]
    public sealed class ModelsStepDefinition
    {
        private readonly ScenarioContext _scenarioContext;
        public ModelContext Context;
        private EnvironmentContext _environmentContext;
        private RestClient _client;

        public ModelsStepDefinition(ScenarioContext scenarioContext, ModelContext context, 
            EnvironmentContext environmentContext)
        {
            _scenarioContext = scenarioContext;
            Context = context;
            _environmentContext = environmentContext;
            _client = new RestClient(_environmentContext.BaseUrl + "/model/");
        }

        [Given(@"I look for the ""(.*)"" model")]
        public void GivenILookForTheModel(string model)
        {
            //if (model == "Zonda")
            //    Context.Model = "c0bm09bgagshpkqbsuag" + @"%7C" + "c0bm09bgagshpkqbsuh0";
            //Not the smartest way of doing it, but literals aren't playing nice with Restsharp atm

            if (model == "Zonda")
                _client = new RestClient($"https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models/c0bm09jgagshpkqbsuq0%7Cc0bm09jgagshpkqbsuqg");              
            else if (model == "Diablo")
                _client = new RestClient($"https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models/c0bm09bgagshpkqbsuag%7Cc0bm09bgagshpkqbsuh0");

        }

        [When(@"I search for model")]
        public void WhenISearchForModel()
        {
            var request = new RestRequest("", Method.GET, DataFormat.Json);
            var response = _client.Execute(request);
            Context.Response = JsonConvert.DeserializeObject<ModelResponse>(response.Content);
        }

        [Then(@"the model name should be ""(.*)""")]
        public void ThenTheModelNameShouldBe(string name)
        {
            Assert.AreEqual(name, Context.Response.name);
        }

        [Then(@"the model make should be ""(.*)""")]
        public void ThenTheModelMakeShouldBe(string make)
        {
            Assert.AreEqual(make, Context.Response.make);
        }

        [Then(@"the model max speed should be (.*)")]
        public void ThenTheModelMaxSpeedShouldBe(int speed)
        {
            Assert.AreEqual(speed, Context.Response.maxSpeed);
        }

    }
}
