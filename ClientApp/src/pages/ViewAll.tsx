import React from 'react'
import { useQuery } from 'react-query'
import { BakeryAndCoffeeShopType } from '../types'

export function ViewAll() {
  const { data: bakeriesAndCoffeeShops = [] } = useQuery<
    BakeryAndCoffeeShopType[]
  >('bakeriesAndCoffeeShops', async function () {
    const response = await fetch('/api/BakeriesAndCoffeeShops')

    return response.json()
  })

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
          {bakeriesAndCoffeeShops.map(function (bakeryAndCoffeeShop) {
            return (
              <div className="shop" key={bakeryAndCoffeeShop.id}>
                <div className="shopinfo">
                  <img
                    className="mainimage"
                    src="src/images/simple-house-icon.png"
                  />
                  <div>
                    <p>{bakeryAndCoffeeShop.name}</p>
                    <p>{bakeryAndCoffeeShop.city}</p>
                    <p>{bakeryAndCoffeeShop.type}</p>
                  </div>
                </div>
                <button>Directions</button>
              </div>
            )
          })}
        </main>
      </div>
    </div>
  )
}
