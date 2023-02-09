import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { games } from "../redux/actions/actions.js";
import Pagina from "./pagina/pagina.jsx";
import img from "./game.module.css"
// import game from "./game.module.css";

function AllGames(props) {

    const allGames = useSelector((state) => state.allgames);

    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(0);

    if (allGames.length <= 0) {
        console.log("entro a la condicion if")
        dispatch(games())
    }

    //? Si la state global no contiene los juegos se mostrara este texto hasta q termine de cargarse los juegos
    if (allGames.length === 0) {
        return (
            <div>
                <h1>Cargando Juegos...</h1>
            </div>
        );
    }

    //! Cuando los juegos hayan sido cargados se mostrara lo siguiente
    else {


        // con esto sabremos cuantas paginas habra
        const totalPages = Math.ceil(allGames.length / 15);

        const buttons = new Array(totalPages).fill(1);

        // inicio de conteo del indice de allGames en este primer caso seria 0, luego 15, luego 30 => esto indica q inicia desde ese elemento
        const startIndex = currentPage * 15;

        // "startIndex" seria el indice de inicio y "startIndex + 15" seria el indice de inicio mas 15 ==> me devuelve ese rango de elementos
        const allGamesForCurrentPage = allGames.slice(startIndex, startIndex + 15);
        return (
            <>
                {/* con el "onClick" seteamos el estado local para renderizar la pagina, segun el indice del array*/}
                {buttons.map((e, i) => {
                    return (
                        <button onClick={() => setCurrentPage(i)} key={i + e}>{i + e}</button>
                    )
                })}
                <div>
                    {/* con el "onClick" seteamos el estado local, segun el numero de la pagina sumamos o restamos 1*/}
                    {currentPage > 0 && <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>}
                    {currentPage < totalPages - 1 && (<button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>)}
                </div>
                <Pagina games={allGamesForCurrentPage} />
            </>
        );
    }
}

export default AllGames;