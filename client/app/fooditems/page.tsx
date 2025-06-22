'use client'

import React, {useEffect, useState} from "react";
import FoodItemLine from "./fooditemline";

function FoodItems() {

  // Food Items Setup
  const [foodItems, setFoodItems] = useState([])
  const fetchFoodItems = () => {
    setFoodItems([])
    fetch("http://localhost:8080/api/fooditems")
      .then((response) => response.json())
      .then((data) => {setFoodItems(data)}
    )
  }
  useEffect(fetchFoodItems, [])

  const fakeFoodItem = {
    id: 0,
    type: 1,
    name: "",
    source: "",
    unit: "",
    unit_portions: 0,
    unit_price: 0
  }
  const [selectedFoodItem, setSelectedFoodItem] = useState(fakeFoodItem)



  // [12:25am !] #1: display area to show off all existing food items
  // [ 2:37am !] #2: editing area to add a new fooditem
  // [ 2:37am !] #3: add button to editing area to delete the entry
  // [ 2:37am !] #4: add button to displayed food items which loads it's information into the editing area, allowing for updating records.


  return (
    <div>
      <h2>This is the FoodItems page!</h2>
      <div className="subarea">
     

        <div className="subarea">
          <h3 id="edit">Create / Edit area</h3>
          <form className="standard-form" action="http://localhost:8080/api/fooditems" method="post">
            <div className="flexh">
              <button className="action-click" type="reset">Clear</button>
            </div>

            {/* Inputs area */}
            <div className="input">
              <label htmlFor="id">id:</label>
              <input className="disabled-input" readOnly type="text" name="id" id="id" value={selectedFoodItem.id} disabled/>
            </div>


            <div className="input">
              <label htmlFor="name">Food name:</label>
              <input type="text" name="name" id="name" defaultValue={selectedFoodItem.name}/>
            </div>

            <div className="input">
              <label htmlFor="source">Food source:</label>
              <input type="text" name="source" id="source" defaultValue={selectedFoodItem.source}/>
            </div>
            
            <div className="input">
              <label htmlFor="unit">Unit of purchase:</label>
              <input type="text" name="unit" id="unit" defaultValue={selectedFoodItem.unit}/>
            </div>

            <div className="input">
              <label htmlFor="unit_portions">Portions in unit:</label>
              <input type="number" name="unit_portions" id="unit_portions" defaultValue={selectedFoodItem.unit_portions} />
            </div>

            <div className="input">
              <label htmlFor="unit_price">Price of unit: $</label>
              <input type="number" name="unit_price" id="unit_price" defaultValue={selectedFoodItem.unit_price} />
            </div>

            {/* Buttons area */}
            <div className="flexh flex-r">

              <button className="action-click" type="submit">Create / Update</button>
            </div>
          </form>
        </div>



        <div className="subarea">
          <h3>Delete area</h3>

          <form className="standard-form" action="http://localhost:8080/api/fooditems/delete" method="post">
            <div className="input">
              <label htmlFor="id">id:</label>
              <input className="disabled-input" type="text" name="id" id="id" value={selectedFoodItem.id}/>
            </div>
            <button className="action-click" type="submit">Delete</button>
          </form>


        </div>
      </div>
      <div className="subarea">
        {
          foodItems.map((x, i) => <FoodItemLine key={i} data={x} loadForEditing={() => setSelectedFoodItem(x)} />)
        }
      </div>
    </div>
  );
}

export default FoodItems