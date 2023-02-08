import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import game from "./game.module.css";
import { games } from "../redux/actions/actions.js";
import img from "./game.module.css"

function AllGames(props) {

    const allGames = useSelector((state) => state.allgames);

    const dispatch = useDispatch()

    if (allGames.length <= 0) {
        console.log("entro a la condicion if")
        dispatch(games())
    }

    console.log(allGames.length)

    return (
        <div>
            {allGames.length > 0 ? allGames.map((game) => {
                return (
                    <div key={game.id}>
                        <p>{game.name}</p>
                        <img className={img.div} src={game.background_image} alt="game image" />
                    </div>
                )
            }) : <h1>Cargando Juegos...</h1>}
        </div>
    );
}

export default AllGames;