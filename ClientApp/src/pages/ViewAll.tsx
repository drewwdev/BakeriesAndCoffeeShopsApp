import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { BakeryAndCoffeeShopType } from '../types'

export function ViewAll() {
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
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <p>⌂</p>
          </Link>
          Home
        </header>
      </div>
      <div className="viewalldiv">
        <main className="viewallmain">
          Type a name, address or type to filter
          <input
            type="search"
            value={filterText}
            onChange={function (event) {
              setFilterText(event.target.value)
            }}
          ></input>
          {bakeriesAndCoffeeShops.map(function (bakeryAndCoffeeShop) {
            return (
              <Link
                to={`/entry/${bakeryAndCoffeeShop.id}`}
                key={bakeryAndCoffeeShop.id}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <div className="shop">
                  <div className="shopinfo">
                    <img
                      className="mainimage"
                      src="../src/images/simple-house-icon.png"
                    />
                    <div>
                      <p>{bakeryAndCoffeeShop.name}</p>
                      <p>{bakeryAndCoffeeShop.city}</p>
                      <p>{bakeryAndCoffeeShop.type}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </main>
      </div>
    </div>
  )
}
