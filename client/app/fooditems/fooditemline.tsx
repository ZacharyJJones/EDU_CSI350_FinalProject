'use client'

import React, {useEffect, useState} from "react";

function FoodItemLine(props) {

  return (
    <div>
      <span><em>{props.data.name}</em> (ID: {props.data.id})</span>
      <div className="flexh subarea">
        <span className="subarea">Type: {props.data.type} ({props.lookup[props.data.type]})</span>
        <span className="subarea">From: {props.data.source}</span>
        <span className="subarea">Unit: {props.data.unit}</span>
        <span className="subarea">Price: ${props.data.unit_price}</span>
        <a className="action-click" href="#edit">Edit&nbsp;/&nbsp;Delete</a>
      </div>
      <br/>
    </div>
  )
}

export default FoodItemLine