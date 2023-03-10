import React from "react";
import { Route } from "react-router-dom";
import AllGames from "./components/allGames.jsx";
import CreateVideogame from "./components/createvideogame/createVideogame.jsx";
import Filterelements from "./components/filtros/filter.jsx";
import Landingpage from "./components/landing/landing.jsx";
import NavBar from "./components/navbar/navbar.jsx";
import SearchPage from "./components/searchPage/searchPage.jsx";

function App() {

  return (
    <div className="App">
      <Route exact path={"/"} component={Landingpage} />

      <Route path={"/:navbar"}>
        <NavBar />
      </Route>

      <Route exact path={"/videogames"} component={Filterelements} />
      <Route exact path={"/searchpage"} component={Filterelements} />

      <Route exact path={"/createVideogame"} component={CreateVideogame} />


      <Route exact path={"/videogames"}>
        <AllGames />
      </Route>

      <Route exact path={"/searchpage"}>
        <SearchPage />
      </Route>
      {/* <Route exact path={"/createVideogame"}>
        <CreateVideogame />
      </Route> */}

    </div>
  );
}



/* function App() {

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
      {Array.isArray(initialState) &&initialState?.map(e => <Prueba name={e.name} img={e.background_image} suma={i++}/>)}
    </div>
  );
} */

export default App;