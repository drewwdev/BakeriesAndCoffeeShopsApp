import React from 'react'

export function SingleEntry() {
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
            src="src/components/images/simple-house-icon.png"
          />
          <div className="shop">
            <div className="entryinfo">
              <div>
                <p>Name</p>
                <p>City</p>
                <p>Type</p>
                <p>Date added</p>
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
              src="src/components/images/simple-house-icon.png"
            />
            <img
              className="singleentrypageimage"
              src="src/components/images/simple-house-icon.png"
            />
            <img
              className="singleentrypageimage"
              src="src/components/images/simple-house-icon.png"
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
