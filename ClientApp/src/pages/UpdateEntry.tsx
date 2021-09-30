import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { BakeryAndCoffeeShopType } from '../types'

export function UpdateEntry() {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  const [newEntry, setNewEntry] = useState<BakeryAndCoffeeShopType>({
    id: undefined,
    name: '',
    city: '',
    type: '',
    mainImage: '',
  })

  useEffect(() => {
    async function fetchEntry() {
      const response = await fetch(`/api/BakeriesAndCoffeeShops/${id}`)

      if (response.ok) {
        setNewEntry(await response.json())
      }
    }
    fetchEntry()
  }, [id])

  function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    const newNameText = event.target.value

    const updatedEntry = { ...newEntry, name: newNameText }
    setNewEntry(updatedEntry)
  }

  function handleCity(event: React.ChangeEvent<HTMLInputElement>) {
    const newCityText = event.target.value

    const updatedEntry = { ...newEntry, city: newCityText }
    setNewEntry(updatedEntry)
  }

  function handleType(event: React.ChangeEvent<HTMLSelectElement>) {
    const newType = event.target.value

    const updatedEntry = { ...newEntry, type: newType }
    setNewEntry(updatedEntry)
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const response = await fetch(`/api/BakeriesAndCoffeeShops/${newEntry.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newEntry),
    })

    {
      if (response.status === 400) {
        await response.json()
      } else {
        history.push('/')
      }
    }
  }

  if (!newEntry.id) {
    return <></>
  }

  return (
    <div className="addentrymain">
      <header className="mainheader">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <p>⌂</p>
        </Link>
        Home
      </header>
      <div className="addentry">
        <input
          className="entryinput"
          type="text"
          placeholder="Name"
          name="name"
          value={newEntry.name}
          onChange={handleName}
        ></input>
        <input
          className="entryinput"
          type="text"
          placeholder="Address"
          name="city"
          value={newEntry.city}
          onChange={handleCity}
        ></input>
        <select
          value={newEntry.type}
          onChange={handleType}
          className="entrytype"
        >
          <option hidden>Choose a type</option>
          <option value="Bakery">Bakery</option>
          <option value="Coffee Shop">Coffee Shop</option>
          <option value="Both">Both</option>
        </select>
        <button className="entrybutton">
          Update picture of the store front
        </button>
        <button onClick={handleSubmit} className="entrybutton">
          Finished
        </button>
      </div>
    </div>
  )
}
