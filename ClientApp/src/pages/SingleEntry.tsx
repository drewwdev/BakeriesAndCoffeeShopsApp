import React from 'react'
import { BakeryAndCoffeeShopType } from '../types'

export function SingleEntry({
  bakeryAndCoffeeShop,
}: {
  bakeryAndCoffeeShop: BakeryAndCoffeeShopType
}) {
  if (bakeryAndCoffeeShop === null) {
    return null
  }

  return (
    <div>
      <div className="home">
        <header className="mainheader">
          <p>⌂</p>Home
        </header>
      </div>
      <main>
        <div className="singleentry">
          <img
            className="singleentrypageimage"
            src="src/images/simple-house-icon.png"
          />
          <div className="shop">
            <div className="entryinfo">
              <div>
                <p>{bakeryAndCoffeeShop.name}</p>
                <p>{bakeryAndCoffeeShop.city}</p>
                <p>{bakeryAndCoffeeShop.type}</p>
                <p>{bakeryAndCoffeeShop.dateAdded}</p>
                <button>Add image</button>
              </div>
            </div>
            <div className="directionsandshare">
              <button>Directions</button>
              <button>Share</button>
            </div>
          </div>
          <div className="entryimages">
            <img
              className="singleentrypageimage"
              src="src/images/simple-house-icon.png"
            />
            <img
              className="singleentrypageimage"
              src="src/images/simple-house-icon.png"
            />
            <img
              className="singleentrypageimage"
              src="src/images/simple-house-icon.png"
            />
          </div>
          <nav className="updatedelete">
            <button>Update</button>
            <button>Delete</button>
          </nav>
        </div>
      </main>
    </div>
  )
}
