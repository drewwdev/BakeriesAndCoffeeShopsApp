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
              <a href="https://www.google.com/maps/dir/Suncoast+Developers+Guild,+Central+Avenue,+St.+Petersburg,+FL/Black+Crow+Coffee+Co+Grand+Central+Dist,+2157+1st+Ave+S,+St.+Petersburg,+FL+33712/@27.7706147,-82.6654428,17z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x88c2e33e008e4721:0x60b583b64463d4bb!2m2!1d-82.6636471!2d27.7708983!1m5!1m1!1s0x88c2e36cd12fc9e3:0xe445edec127315b3!2m2!1d-82.662845!2d27.7703285!3e2">
                <button>Directions</button>
              </a>
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
