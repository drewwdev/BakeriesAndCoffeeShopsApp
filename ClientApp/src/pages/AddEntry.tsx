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

async function uploadFile(fileToUpload: any) {
  const formData = new FormData()
  formData.append('file', fileToUpload)

  const response = await fetch('/api/Uploads', {
    method: 'POST',
    body: formData,
  })
  if (response.ok) {
    return response.json()
  } else {
    throw 'Unable to upload image!'
  }
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

  function handleSubmit(event: any) {
    event.preventDefault()

    createEntry.mutate(newEntry)
  }

  function onFileSelect(acceptedFiles: any) {
    const fileToUpload = acceptedFiles[0]

    uploadFileMutation.mutate(fileToUpload)
  }

  type UploadResponse = {
    url: string
  }
  const uploadFileMutation = useMutation(uploadFile, {
    onSuccess: function (apiResponse: UploadResponse) {
      const url = apiResponse.url

      const updatedEntry = { ...newEntry, mainImage: url }
      setNewEntry(updatedEntry)
    },
  })

  function handleType(event: any) {
    const newType = event.target.value

    const updatedEntry = { ...newEntry, type: newType }
    setNewEntry(updatedEntry)
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
        <label>Add a picture of the store front</label>
        <input
          onChange={(file) => onFileSelect(file.target.files)}
          type="file"
          className="fileupload"
        ></input>
        <button onClick={handleSubmit} className="entrybutton">
          Finished
        </button>
      </div>
    </div>
  )
}
