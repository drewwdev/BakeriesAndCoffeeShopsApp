import React from 'react'

export function ViewAll() {
  return (
    <div>
      <div className="home">
        <header className="mainheader">
          <p>⌂</p> Bakeries and Coffee Shops Database
        </header>
      </div>
      <div className="viewalldiv">
        <main className="viewallmain">
          Type a name or city to filter
          <input type="search"></input>
          <label htmlFor="options">Choose an option:</label>
          <select>
            <option>Bakery</option>
            <option>Coffee Shop</option>
            <option>Both</option>
          </select>
          <div className="shop">
            <div className="entryinfo">
              <img
                className="mainimage"
                src="src/images/simple-house-icon.png"
              />
              <div>
                <p>Name</p>
                <p>City</p>
                <p>Type</p>
              </div>
            </div>
            <button>Directions</button>
          </div>
          <div className="shop">
            <div className="entryinfo">
              <img
                className="mainimage"
                src="src/images/simple-house-icon.png"
              />
              <div>
                <p>Name</p>
                <p>City</p>
                <p>Type</p>
              </div>
            </div>
            <button>Directions</button>
          </div>
          <div className="shop">
            <div className="entryinfo">
              <img
                className="mainimage"
                src="src/images/simple-house-icon.png"
              />
              <div>
                <p>Name</p>
                <p>City</p>
                <p>Type</p>
              </div>
            </div>
            <button>Directions</button>
          </div>
          <div className="shop">
            <div className="entryinfo">
              <img
                className="mainimage"
                src="src/images/simple-house-icon.png"
              />
              <div>
                <p>Name</p>
                <p>City</p>
                <p>Type</p>
              </div>
            </div>
            <button>Directions</button>
          </div>
        </main>
      </div>
    </div>
  )
}
