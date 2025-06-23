'use client'

import React from "react";

function BirthdayItemLine(props) {

  return (
    <div>
      <div className="flexh subarea">
        <span><em>{props.data.name}</em> (ID: {props.data.id})</span>
        <span className="subarea">Born: {props.data.year}-{props.data.month}-{props.data.day}</span>
        <a onClick={props.loadForEditing} className="action-click" href="#edit">Edit&nbsp;/&nbsp;Delete</a>
      </div>
      <br/>
    </div>
  )
}

export default BirthdayItemLine