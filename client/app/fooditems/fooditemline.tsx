'use client'

import React, {useEffect, useState} from "react";

function FoodItemLine(props) {

  return (
    <div>This is a food item line display! Name: {props.data.name}</div>
  )
}

export default FoodItemLine