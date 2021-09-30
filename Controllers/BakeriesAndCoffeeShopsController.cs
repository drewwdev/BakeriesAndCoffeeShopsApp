using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BakeriesAndCoffeeShopsApp.Models;

namespace BakeriesAndCoffeeShopsApp.Controllers
{
    // All of these routes will be at the base URL:     /api/BakeriesAndCoffeeShops
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case BakeriesAndCoffeeShopsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class BakeriesAndCoffeeShopsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public BakeriesAndCoffeeShopsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/BakeriesAndCoffeeShops
        //
        // Returns a list of all your BakeriesAndCoffeeShops
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BakeryAndCoffeeShop>>> GetBakeriesAndCoffeeShops(string filter)
        {
        if (filter == null) {
            return await _context.BakeriesAndCoffeeShops.OrderBy(row => row.Id).ToListAsync();
        }
        else
        {
            return await _context.BakeriesAndCoffeeShops.Where(BakeryAndCoffeeShop => BakeryAndCoffeeShop.Name.ToLower().Contains(filter.ToLower()) | BakeryAndCoffeeShop.Type.ToLower().Contains(filter.ToLower()) | BakeryAndCoffeeShop.City.ToLower().Contains(filter.ToLower())).ToListAsync();
        }
            // Uses the database context in `_context` to request all of the BakeriesAndCoffeeShops, sort
            // them by row id and return them as a JSON array.
        }

        // GET: api/BakeriesAndCoffeeShops/5
        //
        // Fetches and returns a specific bakeryAndCoffeeShop by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<BakeryAndCoffeeShop>> GetBakeryAndCoffeeShop(int id)
        {
            // Find the bakeryAndCoffeeShop in the database using `FindAsync` to look it up by id
            var bakeryAndCoffeeShop = await _context.BakeriesAndCoffeeShops.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (bakeryAndCoffeeShop == null)
            {
                // Return a `404` response to the client indicating we could not find a bakeryAndCoffeeShop with this id
                return NotFound();
            }

            //  Return the bakeryAndCoffeeShop as a JSON object.
            return bakeryAndCoffeeShop;
        }

        // PUT: api/BakeriesAndCoffeeShops/5
        //
        // Update an individual bakeryAndCoffeeShop with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a BakeryAndCoffeeShop
        // variable named bakeryAndCoffeeShop. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our BakeryAndCoffeeShop POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBakeryAndCoffeeShop(int id, BakeryAndCoffeeShop bakeryAndCoffeeShop)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != bakeryAndCoffeeShop.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in bakeryAndCoffeeShop to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from bakeryAndCoffeeShop
            _context.Entry(bakeryAndCoffeeShop).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!BakeryAndCoffeeShopExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(bakeryAndCoffeeShop);
        }

        // POST: api/BakeriesAndCoffeeShops
        //
        // Creates a new bakeryAndCoffeeShop in the database.
        //
        // The `body` of the request is parsed and then made available to us as a BakeryAndCoffeeShop
        // variable named bakeryAndCoffeeShop. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our BakeryAndCoffeeShop POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<BakeryAndCoffeeShop>> PostBakeryAndCoffeeShop(BakeryAndCoffeeShop bakeryAndCoffeeShop)
        {
            // Indicate to the database context we want to add this new record
            _context.BakeriesAndCoffeeShops.Add(bakeryAndCoffeeShop);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetBakeryAndCoffeeShop", new { id = bakeryAndCoffeeShop.Id }, bakeryAndCoffeeShop);
        }

        // DELETE: api/BakeriesAndCoffeeShops/5
        //
        // Deletes an individual bakeryAndCoffeeShop with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBakeryAndCoffeeShop(int id)
        {
            // Find this bakeryAndCoffeeShop by looking for the specific id
            var bakeryAndCoffeeShop = await _context.BakeriesAndCoffeeShops.FindAsync(id);
            if (bakeryAndCoffeeShop == null)
            {
                // There wasn't a bakeryAndCoffeeShop with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.BakeriesAndCoffeeShops.Remove(bakeryAndCoffeeShop);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(bakeryAndCoffeeShop);
        }

        // Private helper method that looks up an existing bakeryAndCoffeeShop by the supplied id
        private bool BakeryAndCoffeeShopExists(int id)
        {
            return _context.BakeriesAndCoffeeShops.Any(bakeryAndCoffeeShop => bakeryAndCoffeeShop.Id == id);
        }
    }
}
