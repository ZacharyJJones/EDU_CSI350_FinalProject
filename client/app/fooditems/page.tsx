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

  const [portionTypes, setPortionTypes] = useState([])
  useEffect(() => {
    fetch("http://localhost:8080/api/portiontypes")
    .then((response) => response.json())
    .then((data) => {
      setPortionTypes(data)
    })
  }, [])


  // [12:25am !] #1: display area to show off all existing food items
  // #2: editing area to add a new fooditem
  // #3: add button to displayed food items to delete the entry
  // #4: add button to displayed food items which loads it's information into the editing area, allowing for updating records.


  return (
    <div>
      <h2>This is the FoodItems page!</h2>
      <div className="subarea">
        <form action="/api/fooditems" method="post"></form>
      </div>
      <div className="subarea">
        {
          foodItems.map((x, i) => <FoodItemLine key={i} data={x} callOnDelete={fetchFoodItems} />)
        }
      </div>
    </div>
  );
}

export default FoodItems