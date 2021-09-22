using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace BakeriesAndCoffeeShopsApp.Models
{
    public class BakeryAndCoffeeShop
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "You must provide a name.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "You must provide an address.")]
        public string Address { get; set; }
        [Required(ErrorMessage = "You must say whether it is a bakery or not.")]
        public bool Bakery { get; set; }
        [Required(ErrorMessage = "You must say whether it is a coffee shop or not.")]
        public bool CoffeeShop { get; set; }
        public DateTime DateAdded { get; set; }
        public int MainImage { get; set; }
    }
}