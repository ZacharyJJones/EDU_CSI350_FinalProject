'use client'

import React from "react";

function PenItemLine(props) {

  return (
    <div>
      <span><em>{props.data.brand} - {props.data.model}</em> (ID: {props.data.id})</span>
      <div className="flexh subarea">
        <span className="subarea">Color: {props.data.color}</span>
        <span className="subarea">Point Thickness: {props.data.point}mm</span>
        <a onClick={props.loadForEditing} className="action-click" href="#edit">Edit&nbsp;/&nbsp;Delete</a>
      </div>
      <br/>
    </div>
  )
}

export default PenItemLine