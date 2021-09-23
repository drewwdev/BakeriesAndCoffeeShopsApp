import React from 'react'
import { useQuery } from 'react-query'

import { BakeryAndCoffeeShopType } from '../types'

export function Home() {
  const { data: bakeriesAndCoffeeShops = [] } = useQuery<
    BakeryAndCoffeeShopType[]
  >('bakeriesAndCoffeeShops', async function () {
    const response = await fetch('/api/BakeriesAndCoffeeShops')

    return response.json()
  })

  console.log(bakeriesAndCoffeeShops)

  return (
    <div>
      <div className="home">
        <header className="mainheader">
          Bakeries and Coffee Shops Database
        </header>
      </div>
      <main className="homemain">
        <div className="search">
          <header>Search by name/ city/ type</header>
          <input type="search"></input>
        </div>
        <div className="add">
          <button>Add a new bakery/ coffee shop</button>
        </div>
        <div className="nearby">
          <header>Nearby bakeries/ coffee shops</header>
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
          <button className="viewallbutton">
            View all bakeries and coffee shops
          </button>
        </div>
      </main>
    </div>
  )
}
