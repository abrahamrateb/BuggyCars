using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace APIBuggyCars.Models
{
    public class ModelResponse
    {
        public string name { get; set; }
        public string description { get; set; }
        public string image { get; set; }
        public string make { get; set; }
        public string makeId { get; set; }
        public string makeImage { get; set; }
        public int votes { get; set; }
        public int engineVol { get; set; }
        public int maxSpeed { get; set; }
        public List<Comment> comments { get; set; }
        public bool canVote { get; set; }
        public class Comment
        {
            public string user { get; set; }
            public string datePosted { get; set; }
            public string text { get; set; }
        }
    }
}
