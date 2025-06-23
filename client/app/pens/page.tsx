'use client'

import React, {useEffect, useState} from "react";
import PenItemLine from "./penitemline";

function Pens() {

  // Food Items Setup
  const [pens, setPens] = useState([])
  const fetchPens = () => {
    setPens([])
    fetch("http://localhost:8080/api/pens")
      .then((response) => response.json())
      .then((data) => {setPens(data)}
    )
  }
  useEffect(fetchPens, [])

  const fakePen = {
    id: 0,
    brand: "",
    model: "",
    color: "",
    point: 0.1
  }
  const [selectedPen, setSelectedPen] = useState(fakePen)


  return (
    <div>
      <h2>This is the Pens page!</h2>
      <div className="subarea">
     

        <div className="subarea">
          <h3 id="edit">Create / Edit area</h3>
          <form className="standard-form" action="http://localhost:8080/api/pens" method="post">
            <div className="flexh">
              <button className="action-click" type="reset">Clear</button>
            </div>

            {/* Inputs area */}
            <div className="input">
              <label htmlFor="id">id:</label>
              <input className="disabled-input" readOnly type="text" name="id" id="id" value={selectedPen.id} disabled/>
            </div>


            <div className="input">
              <label htmlFor="brand">Pen Brand:</label>
              <input type="text" name="brand" id="brand" defaultValue={selectedPen.brand}/>
            </div>
            <div className="input">
              <label htmlFor="model">Pen Model:</label>
              <input type="text" name="model" id="model" defaultValue={selectedPen.model}/>
            </div>
            <div className="input">
              <label htmlFor="color">Pen Color:</label>
              <input type="text" name="color" id="color" defaultValue={selectedPen.color}/>
            </div>

            <div className="input">
              <label htmlFor="point">Pen Point Thickness:</label>
              <input type="number" name="point" id="point" defaultValue={selectedPen.point} />
            </div>


            {/* Buttons area */}
            <div className="flexh flex-r">

              <button className="action-click" type="submit">Create / Update</button>
            </div>
          </form>
        </div>



        <div className="subarea">
          <h3>Delete area</h3>

          <form className="standard-form" action="http://localhost:8080/api/pens/delete" method="post">
            <div className="input">
              <label htmlFor="id">id:</label>
              <input className="disabled-input" type="text" name="id" id="id" value={selectedPen.id}/>
            </div>
            <button className="action-click" type="submit">Delete</button>
          </form>


        </div>
      </div>
      <div className="subarea">
        {
          pens.map((x, i) => <PenItemLine key={i} data={x} loadForEditing={() => setSelectedPen(x)} />)
        }
      </div>
    </div>
  );
}

export default Pens