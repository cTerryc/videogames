import { useSelector } from "react-redux";
import searchpage from "./searchpage.module.css";
import Filterelements from "../filtros/filter";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function SearchPage() {

    const { searchGames, searchpagestate } = useSelector((state) => state)
    const [local, setLocal] = useState([])
    const history = useHistory()
    const [localError, setLocalError] = useState()

    let isMounted = true

    useEffect(() => {
        // si el componente esta montado actualizara el estado local "setLocalError" a => "<h2>Loading...</h2>", que proviene del estado global "searchpagestate" en el reducer
        if (isMounted) {
            setLocalError(searchpagestate)
        }
        // el inputSearch seteara el estado global "setLocalError" , creando un cambio, por ende se renderizara "<h2>Loading...</h2>", una vez q el get termine, aparecera, lo q haya q renderizar
    },[searchpagestate])

    let index = 1;
    let index2 = 20

    useEffect(() => {
        // si el componente esta montado 
        if (isMounted) {
            setLocal(searchGames)
        }
    }, [searchGames])

    // este click es para el boton de ERROR 404, y ais volver a home
    function onClick(e) {
        if (isMounted) {
            isMounted = false
            setLocalError(searchpagestate)
            history.push("/videogames")
            return (() => {
            })
        }
    }

    function gamesNotFound () {
        if (isMounted) {
            // al recargar la pagina o buscar un juego q no existe, pasado 5 segundos, se renderizara el contenido
            setTimeout(() => {
                setLocalError(() => {
                    return (
                        <>
                        <h2> Error 404 Games Not Found </h2>
                        <button onClick={onClick}> Go Back</button>
                        </>
                    )
                })
            }, 5000)
        }
    }

    // si existe info en el estado local, se renderizara
    if (local.length > 0) {
        return (
            <div className={searchpage.garden}>
                {local?.map((ele, i) => {
                    index++
                    return (
                        <div key={index} className={searchpage.div}>
                            <h5>{ele.name}</h5>
                            <img className={searchpage.img} src={ele.background_image} alt="gameimage" />
                            {ele.Generos?.map((gen) => {
                                index2++
                                return (
                                    <div key={index2}>{gen.name}</div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    // sirve como loader y como pagina 404, primero aparecera "<h2>Loading...</h2>", si pasado 5 segundos el estado "localError", no tiene cambios, se renderizara error 404
    } else {
        return (
            <div>
                {localError}
                
                {/* esta funcion se cambiara el estado "localError" = "loading.."", por un "error 404 games not found" */}
                {gamesNotFound()}
            </div>
        )
    }

    // return (
    //     <div>
    //         <div className={searchpage.garden}>
    //             {local.length > 0 ? (local?.map((ele) => {
    //                 index++
    //                 return (
    //                     <div key={index} className={searchpage.div}>
    //                         <h5>{ele.name}</h5>
    //                         <img className={searchpage.img} src={ele.image} alt="gameimage" />
    //                         {ele.Generos?.map((gen) => {
    //                             index2++
    //                             return (
    //                                 <div key={index2}>{gen.name}</div>
    //                             )
    //                         })}
    //                     </div>)
    //             })) :
    //                 <div>
    //                     <h2>Loading Games...</h2>
    //                     {setTimeout(() => {
    //                         return(
    //                             <>
    //                                 <h1>Games not Found</h1>
    //                                 <button onClick={onClick}>
    //                                     Go Home
    //                                 </button>
    //                             </>
    //                         )
    //                     }, 3000)}
    //                 </div>
    //             }
    //         </div>
    //     </div>
    // )
}