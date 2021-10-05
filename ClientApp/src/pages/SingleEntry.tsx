import React from 'react'
import { useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router'
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
  const history = useHistory()

  async function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const response = await fetch(`/api/BakeriesAndCoffeeShops/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
    if (response.status === 200 || response.status === 204) {
      history.push('/')
    }
  }

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
          <img className="singleentrypageimage" src={entry.mainImage} />
          <div className="shop">
            <div className="entryinfo">
              <div>
                <p>{entry.name}</p>
                <p>{entry.city}</p>
                <p>{entry.type}</p>
              </div>
            </div>
            <div className="directionsandshare">
              <button>Directions</button>
            </div>
          </div>

          <nav className="updatedelete">
            <Link to={`/update/${entry.id}`}>
              <button>Update</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
          </nav>
        </div>
      </main>
    </div>
  )
}
