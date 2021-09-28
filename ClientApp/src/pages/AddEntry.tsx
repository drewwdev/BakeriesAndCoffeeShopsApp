import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { BakeryAndCoffeeShopType } from '../types'

async function submitNewEntry(entryToCreate: BakeryAndCoffeeShopType) {
  const response = await fetch('/api/BakeriesAndCoffeeShops', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(entryToCreate),
  })

  return response.json()
}

export function AddEntry() {
  const [newEntry, setNewEntry] = useState<BakeryAndCoffeeShopType>({
    id: undefined,
    name: '',
    city: '',
    type: '',
    mainImage: '',
  })

  const history = useHistory()
  const createEntry = useMutation(submitNewEntry, {
    onSuccess: function () {
      history.push('/')
    },
  })

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

  function handleType(event: any) {
    const newType = event.target.value

    const updatedEntry = { ...newEntry, type: newType }
    setNewEntry(updatedEntry)
  }

  async function handleSubmit(event: any) {
    event.preventDefault()

    createEntry.mutate(newEntry)
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
          placeholder="City"
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
          Add a picture of the store front
        </button>
        <button className="entrybutton">Add any other pictures</button>
        <button onClick={handleSubmit} className="entrybutton">
          Finished
        </button>
      </div>
    </div>
  )
}
