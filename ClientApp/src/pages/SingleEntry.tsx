import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { BakeryAndCoffeeShopType } from '../types'

async function loadOneEntry(id: string) {
  const response = await fetch(`/api/BakeriesAndCoffeeShops/${id}`)
  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

const NullEntry: BakeryAndCoffeeShopType = {
  id: 0,
  name: '',
  city: '',
  type: '',
  mainImage: '',
}

export function SingleEntry() {
  const { id } = useParams<{ id: string }>()

  const { data: entry = NullEntry } = useQuery<BakeryAndCoffeeShopType>(
    ['one-entry', id],
    () => loadOneEntry(id)
  )

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
      <main>
        <div className="singleentry">
          <img
            className="singleentrypageimage"
            src="../src/images/simple-house-icon.png"
          />
          <div className="shop">
            <div className="entryinfo">
              <div>
                <p>{entry.name}</p>
                <p>{entry.city}</p>
                <p>{entry.type}</p>
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
              src="../src/images/simple-house-icon.png"
            />
            <img
              className="singleentrypageimage"
              src="../src/images/simple-house-icon.png"
            />
            <img
              className="singleentrypageimage"
              src="../src/images/simple-house-icon.png"
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
