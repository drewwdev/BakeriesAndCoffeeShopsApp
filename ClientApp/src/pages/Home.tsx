import React from 'react'
import { useQuery } from 'react-query'
import { BakeriesAndCoffeeShopType } from '../types'

export function Home() {
  const { data: bakeriesAndCoffeeShops = [] } = useQuery<
    BakeriesAndCoffeeShopType[]
  >('BakeriesAndCoffeeShops', async function () {
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
          <div className="shop">
            <div className="shopinfo">
              <img
                className="mainimage"
                src="src/components/images/simple-house-icon.png"
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
            <div className="shopinfo">
              <img
                className="mainimage"
                src="src/components/images/simple-house-icon.png"
              />
              <div>
                <p>Name</p>
                <p>City</p>
                <p>Type</p>
              </div>
            </div>
            <button className="directions">Directions</button>
          </div>
          <div className="shop">
            <div className="shopinfo">
              <img
                className="mainimage"
                src="src/components/images/simple-house-icon.png"
              />
              <div>
                <p>Name</p>
                <p>City</p>
                <p>Type</p>
              </div>
            </div>
            <button>Directions</button>
          </div>
          <button className="viewallbutton">
            View all bakeries and coffee shops
          </button>
        </div>
      </main>
    </div>
  )
}
