import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { BakeryAndCoffeeShopType } from '../types'

async function loadEntry(id: string) {
  const response = await fetch(`/api/BakeriesAndCoffeeShops/${id}`)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

async function submitUpdatedEntry(entryToUpdate: BakeryAndCoffeeShopType) {
  const response = await fetch(
    `/api/BakeriesAndCoffeeShops/${entryToUpdate.id}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(entryToUpdate),
    }
  )
  return response.json()
}

export function UpdateEntry() {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  useQuery<BakeryAndCoffeeShopType>(['one-entry', id], () => loadEntry(id), {
    onSuccess: function (entryBeingLoaded) {
      setNewEntry(entryBeingLoaded)
    },
  })

  const [newEntry, setNewEntry] = useState<BakeryAndCoffeeShopType>({
    id: undefined,
    name: '',
    city: '',
    type: '',
    mainImage: '',
  })

  const updateTheEntry = useMutation(submitUpdatedEntry, {
    onSuccess: function () {
      history.push('/')
    },
    onError: function () {
      console.log('that didnt work')
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

  function handleType(event: React.ChangeEvent<HTMLSelectElement>) {
    const newType = event.target.value

    const updatedEntry = { ...newEntry, type: newType }
    setNewEntry(updatedEntry)
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
        <label> Update picture of the store front</label>
        <input
          type="file"
          onChange={(file) => onFileSelect(file.target.files)}
          className="fileupload"
        ></input>
        <button
          onClick={() => {
            updateTheEntry.mutate(newEntry)
          }}
          className="entrybutton"
        >
          Finished
        </button>
      </div>
    </div>
  )
}
