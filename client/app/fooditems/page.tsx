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

  // Ended up hardcoding this here to not get stuck on what seemed like race conditions
  // -- would've been cool to get the info from the api.
  const foodTypeNameLookup = {
    1: "Carb",
    2: "Dairy",
    3: "Fat",
    4: "Fruit",
    5: "Protein",
    6: "Vegetable"
  }
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/portiontypes")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     data.forEach(x => {
  //       foodTypeNameLookup[x.id] = x.name
  //     })

  //     // We wait to do this until after getting the portion type info
  //     // ... so that everything is available when needed
  //     fetchFoodItems()
  //   })
  // }, [])

  // will call this when following buttons are clicked:
  // "clear", "delete"
  // For the "create / edit" button, will leave values unchanged in case further changes are wanted.
  const setEditingAreaValues = (foodItem) => {
    // set all fields in form area according to input
    // -- clear those fields if input is null
  }

  // [12:25am !] #1: display area to show off all existing food items
  // #2: editing area to add a new fooditem
  // #3: add button to editing area to delete the entry
  // #4: add button to displayed food items which loads it's information into the editing area, allowing for updating records.


  return (
    <div>
      <h2>This is the FoodItems page!</h2>
      <div className="subarea">
        <h3>Create / Edit area</h3>
        <form className="standard-form" action="/api/fooditems" method="post">
          <div className="flexh">
            <button className="action-click" type="reset">Clear</button>
          </div>

          {/* Inputs area */}
          <div className="input">
            <label htmlFor="id">id:</label>
            <input className="disabled-input" type="text" name="id" id="id" disabled/>
          </div>

          <div className="input">
            <label htmlFor="type">Food type:</label>
            <select name="type" id="type">
              {/* There must be a way of generating this based on the lookup table! */}
              <option value={1}>Carb</option>
              <option value={2}>Dairy</option>
              <option value={3}>Fat</option>
              <option value={4}>Fruit</option>
              <option value={5}>Protein</option>
              <option value={6}>Vegetable</option>
            </select>
          </div>



          <div className="input">
            <label htmlFor="name">Food name:</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="input">
            <label htmlFor="source">Food source:</label>
            <input type="text" name="source" id="source" placeholder="Costco"/>
          </div>
          
          <div className="input">
            <label htmlFor="unit">Unit of purchase:</label>
            <input type="text" name="unit" id="unit" />
          </div>

          <div className="input">
            <label htmlFor="unit_portions">Portions in unit:</label>
            <input type="number" name="unit_portions" id="unit_portions" />
          </div>

          <div className="input">
            <label htmlFor="unit_price">Price of unit: $</label>
            <input type="number" name="unit_price" id="unit_price" />
          </div>

          {/* Buttons area */}
          <div className="flexh flex-r">

            <button className="action-click" type="submit">Create / Update</button>
            <button className="action-click" type="submit">Delete</button>
          </div>
        </form>
      </div>
      <div className="subarea">
        {
          foodItems.map((x, i) => <FoodItemLine key={i} data={x} lookup={foodTypeNameLookup} loadForEditing={fetchFoodItems} />)
        }
      </div>
    </div>
  );
}

export default FoodItems