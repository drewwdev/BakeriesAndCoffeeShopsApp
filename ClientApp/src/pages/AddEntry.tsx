import React from 'react'

export function AddEntry() {
  return (
    <div className="addentrymain">
      <header className="mainheader">
        <p>⌂</p> Bakeries and Coffee Shops Database
      </header>
      <div className="addentry">
        <input className="entryinput" type="text" placeholder="Name"></input>
        <input
          className="entryinput"
          type="text"
          placeholder="address: 123 main st, St Petersburg, FL, 33705"
        ></input>
        <select className="entrytype">
          <option>Choose a type</option>
          <option>Bakery</option>
          <option>Coffee Shop</option>
          <option>Both</option>
        </select>
        <button className="entrybutton">
          Add a picture of the store front
        </button>
        <button className="entrybutton">Add any other pictures</button>
        <button className="entrybutton">Finished</button>
      </div>
    </div>
  )
}
