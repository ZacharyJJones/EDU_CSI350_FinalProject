'use client'

import React, {useEffect, useState} from "react";

function Home() {

  const [portionTypes, setPortionTypes] = useState([])
  useEffect(() => {
    fetch("http://localhost:8080/api/portiontypes")
    .then((response) => response.json())
    .then((data) => {
      setPortionTypes(data)
    })
  }, [])

  return (
    <div>
      <div>This is the home page!</div>
    </div>
  );
}

export default Home