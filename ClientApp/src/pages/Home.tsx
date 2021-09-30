import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { BakeryAndCoffeeShopType } from '../types'

export function Home() {
  const { data: bakeriesAndCoffeeShops = [] } = useQuery<
    BakeryAndCoffeeShopType[]
  >(['bakeriesAndCoffeeShops'], async function () {
    const response = await fetch('/api/BakeriesAndCoffeeShops')

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
          <Link
            to="/allentries"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <button className="viewallbutton">
              View all bakeries and coffee shops
            </button>
          </Link>
        </div>
        <div className="add">
          <Link
            to="/newentry"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <button>Add a new bakery/ coffee shop</button>
          </Link>
        </div>
        <div className="nearby">
          <header>Latest bakeries/ coffee shops</header>
          {bakeriesAndCoffeeShops
            .slice(0, 3)
            .map(function (bakeryAndCoffeeShop) {
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
        </div>
      </main>
    </div>
  )
}
