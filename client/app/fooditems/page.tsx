'use client'

import React, {useEffect, useState} from "react";
import FoodItemLine from "./fooditemline";

function FoodItems() {

  const [portionTypes, setPortionTypes] = useState([])
  useEffect(() => {
    fetch("http://localhost:8080/api/portiontypes")
    .then((response) => response.json())
    .then((data) => {
      setPortionTypes(data)
    })
  }, [])

  const [foodItems, setFoodItems] = useState([])
  useEffect(() => {
    fetch("http://localhost:8080/api/fooditems")
    .then((response) => response.json())
    .then((data) => {
      setFoodItems(data)
    })
  }, [])

  // #1: editing area to add a new fooditem
  // #2: display area to show off all existing food items
  // #3: add button to displayed food items to delete the entry
  // #4: add button to displayed food items which loads it's information into the editing area, allowing for updating records.

  return (
    <div>
      <div>This is the FoodItems page!</div>
      <div>
        {
          portionTypes.map((x, index) => (
            <div key={index}>{x.name}: {x.kcal}kcal</div>
          ))
        }
      </div>
      <div>
        {
          foodItems.map((x, i) => <FoodItemLine key={i} data={x} />)
        }
      </div>
    </div>
  );
}

export default FoodItems