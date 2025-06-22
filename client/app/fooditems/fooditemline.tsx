'use client'

import React from "react";

function FoodItemLine(props) {

  return (
    <div>
      <span><em>{props.data.name}</em> (ID: {props.data.id})</span>
      <div className="flexh subarea">
        <span className="subarea">From: {props.data.source}</span>
        <span className="subarea">Unit: {props.data.unit}</span>
        <span className="subarea">Price: ${props.data.unit_price}</span>
        <a onClick={props.loadForEditing} className="action-click" href="#edit">Edit&nbsp;/&nbsp;Delete</a>
      </div>
      <br/>
    </div>
  )
}

export default FoodItemLine