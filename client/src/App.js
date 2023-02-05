import React, { useState } from "react";
import Game from "./components/game.jsx"

function App() {

  const [initialState, setInitialState] = useState()

  function perdirApi() {
    fetch(`http://localhost:3001/videogames`)
      .then(infoApi => infoApi.json())
      .then(data => {
        console.log(data)
        setInitialState(data)
      })
  }

  function stateNull() {
    setInitialState("s")
    perdirApi()
  }
  
  let i = 1;
  
  return (
    <div className="App">
      <button onClick={(e) => stateNull(e)}>Pedir info Api</button>
      {typeof initialState === "string" && <h2>Cargando Juegos...</h2>}
      {Array.isArray(initialState) &&initialState?.map(e => <Game name={e.name} suma={i++}/>)}
    </div>
  );
}

export default App;
