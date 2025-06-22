'use client'

import React, {useEffect, useState} from "react";

function FoodItemLine(props) {

  return (
    <div>
      Name: {props.data.name}
      <form action="http://localhost:8080/api/fooditems/delete" method="post"><input type="button" name="id" id="id" value={props.data.id} onClick={props.callOnDelete} /></form>
    </div>
  )
}

export default FoodItemLine