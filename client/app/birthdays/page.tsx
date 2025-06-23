'use client'

import React, {useEffect, useState} from "react";
import BirthdayItemLine from "./birthdayitemline";

function Birthdays() {

  // Food Items Setup
  const [birthdays, setBirthdays] = useState([])
  const fetchFoodItems = () => {
    setBirthdays([])
    fetch("http://localhost:8080/api/birthdays")
      .then((response) => response.json())
      .then((data) => {setBirthdays(data)}
    )
  }
  useEffect(fetchFoodItems, [])

  const fakeBirthday = {
    id: 0,
    name: "",
    year: 0,
    month: 0,
    day: 0
  }
  const [selectedBirthday, setSelectedBirthday] = useState(fakeBirthday)


  return (
    <div>
      <h2>This is the Birthdays page!</h2>
      <div className="subarea">
     

        <div className="subarea">
          <h3 id="edit">Create / Edit area</h3>
          <form className="standard-form" action="http://localhost:8080/api/birthdays" method="post">
            <div className="flexh">
              <button className="action-click" type="reset">Clear</button>
            </div>

            {/* Inputs area */}
            <div className="input">
              <label htmlFor="id">id:</label>
              <input className="disabled-input" readOnly type="text" name="id" id="id" value={selectedBirthday.id} disabled/>
            </div>


            <div className="input">
              <label htmlFor="name">Birthday Person's name:</label>
              <input type="text" name="name" id="name" defaultValue={selectedBirthday.name}/>
            </div>

            <div className="input">
              <label htmlFor="year">Birth Year:</label>
              <input type="number" name="year" id="year" defaultValue={selectedBirthday.year} />
            </div>

            <div className="input">
              <label htmlFor="month">Birth Month:</label>
              <input type="number" name="month" id="month" defaultValue={selectedBirthday.month} />
            </div>
            
            <div className="input">
              <label htmlFor="day">Birth Day:</label>
              <input type="number" name="day" id="day" defaultValue={selectedBirthday.day} />
            </div>


            {/* Buttons area */}
            <div className="flexh flex-r">

              <button className="action-click" type="submit">Create / Update</button>
            </div>
          </form>
        </div>



        <div className="subarea">
          <h3>Delete area</h3>

          <form className="standard-form" action="http://localhost:8080/api/birthdays/delete" method="post">
            <div className="input">
              <label htmlFor="id">id:</label>
              <input className="disabled-input" type="text" name="id" id="id" value={selectedBirthday.id}/>
            </div>
            <button className="action-click" type="submit">Delete</button>
          </form>


        </div>
      </div>
      <div className="subarea">
        {
          birthdays.map((x, i) => <BirthdayItemLine key={i} data={x} loadForEditing={() => setSelectedBirthday(x)} />)
        }
      </div>
    </div>
  );
}

export default Birthdays