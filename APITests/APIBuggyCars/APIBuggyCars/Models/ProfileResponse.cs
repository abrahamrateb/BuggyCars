using System;
using System.Collections.Generic;
using System.Text;

namespace APIBuggyCars.Models
{
    public class ProfileResponse
    {
        public string username { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string gender { get; set; }
        public string age { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public string hobby { get; set; }
    }
}
