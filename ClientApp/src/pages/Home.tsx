import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { BakeryAndCoffeeShopType } from '../types'

export function Home() {
  const [filterText, setFilterText] = useState('')

  const { data: bakeriesAndCoffeeShops = [] } = useQuery<
    BakeryAndCoffeeShopType[]
  >(['bakeriesAndCoffeeShops', filterText], async function () {
    const response = await fetch(
      filterText.length === 0
        ? '/api/BakeriesAndCoffeeShops'
        : `/api/BakeriesAndCoffeeShops?filter=${filterText}`
    )

    return response.json()
  })

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
          <input
            value={filterText}
            onChange={function (event) {
              setFilterText(event.target.value)
            }}
            type="search"
          ></input>
        </div>
        <div className="add">
          <button>Add a new bakery/ coffee shop</button>
        </div>
        <div className="nearby">
          <header>Nearby bakeries/ coffee shops</header>
          {bakeriesAndCoffeeShops
            .slice(0, 3)
            .map(function (bakeryAndCoffeeShop) {
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
