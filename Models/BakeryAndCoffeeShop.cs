using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Globalization;

namespace BakeriesAndCoffeeShopsApp.Models
{
    public class BakeryAndCoffeeShop
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "You must provide a name.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "You must provide a city.")]
        public string City { get; set; }
        [Required(ErrorMessage = "You must provide a type.")]
        public string Type { get; set; }
        public DateTime DateAdded { get; set; }
        public string MainImage { get; set; }
    }
}