// import { useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { gamesSearch, searchPagseState } from "../../redux/actions/actions";
import filterstyle from "./filter.module.css"

export default function Filterelements() {

    let generos = [
        "Select...",
        "Action",
        "Indie",
        "Adventure",
        "RPG",
        "Strategy",
        "Shooter",
        "Casual",
        "Simulation",
        "Puzzle",
        "Arcade",
        "Platformer",
        "Racing",
        "Massively-Multiplayer",
        "Sports",
        "Fighting",
        "Family",
        "Board Games",
        "Educational",
        "Card"
    ]

    const labels = ["Genres", "Db or APi", "Rating or A-Z"];
    const dbApi = ["Select...", "Data Base", "APi"];
    const rating = ["Select...", "1 to 5", "5 to 1", "A to Z", "Z to A"];
    let arraysTotal = [generos, dbApi, rating];

    const { allgames } = useSelector(state => state)
    const dispatch = useDispatch();
    const [inputSearch, setInputSearch] = useState([]);//qwe
    const history = useHistory();
    const location = useLocation();
    const [selectState, setSelectState] = useState({
        "Genres": "",
        "Db or APi": "",
        "Rating or A-Z": "",
    })



    useEffect(() => {
        console.log(location)
    }, [])
    useEffect(() => {
        console.log(selectState)
    }, [selectState])

    function onChange(e) {
        console.log(e.target.value)
        console.log(e.target.name)
        setSelectState({
            ...selectState,
            [e.target.name]: e.target.value
        })
    }

    function onSubmit(e) {
        e.preventDefault()

        // console.log("Esto es Location => ", location.pathname)
        let gamesAreFiltered = []
        if (selectState.Genres && selectState.Genres !== "Select...") {
            let filterByGenres = allgames.filter(ele => {
                // "some()" => comprueba si al menos un elemento del array cumple con la condición
                return ele.genres.some(valueObj => {
                    return (
                        //! valueObj.value.startsWith(filterConditions.startsWith) ||
                        //? valueObj.value.endsWith(filterConditions.endsWith) ||
                        valueObj.name.includes(selectState.Genres)
                    );
                });
            });
            gamesAreFiltered = filterByGenres;
        }
        if (selectState["Db or APi"] === "Data Base") {
            if (gamesAreFiltered.length === 0) gamesAreFiltered = allgames
            let filterByDbApi = gamesAreFiltered.filter(ele => {
                return ele.id.toString().length > 10
            })
            gamesAreFiltered = filterByDbApi;
        }
        if (selectState["Db or APi"] === "APi") {
            if (gamesAreFiltered.length === 0) gamesAreFiltered = allgames
            let filterByDbApi = gamesAreFiltered.filter(ele => {
                return ele.id.toString().length < 10
            })
            gamesAreFiltered = filterByDbApi;
        }

        if (selectState["Rating or A-Z"] === "A to Z") {
            gamesAreFiltered.sort(function (a, b) {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
        }
        if (selectState["Rating or A-Z"] === "Z to A") {
            gamesAreFiltered.sort(function (a, b) {
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            });
        }
        if (selectState["Rating or A-Z"] === "1 to 5") {
            gamesAreFiltered.sort(function (a, b) {
                return a.rating - b.rating;
            });
        }
        if (selectState["Rating or A-Z"] === "5 to 1") {
            gamesAreFiltered.sort(function (a, b) {
                return b.rating - a.rating;
            });
        }

        console.log(gamesAreFiltered)
        if (location.pathname === "/videogames") {

        }
    }
    //creamos estas variables para asignarlas como Key
    let index = 1;
    let index2 = 100;

    function onChangeSearch(e) {
        setInputSearch(e.target.value)
    }

    function onSubmitSearch(e) {
        e.preventDefault();

        // esto es, para poder setear el estado "searchGames" de manera instantanea en un array vacio
        let inputTemporal = "";

        // si el input contiene informacio(nombre) se redigira hacia la pagina
        if (inputSearch.length > 0) {
            history.push("/searchpage")

            //en el caso de q no haya nada en el input este interrumpira cualquier accion
        } else if (inputSearch.length < 1) return

        // despues de q la pagina sea redirigida, se hara un dispatch para q la pagina searchPage al ser renderizada muestre el loading
        dispatch(gamesSearch(inputTemporal))

        //esto seteara el estado global "searchpagestate"
        dispatch(searchPagseState(<h2>Loading...</h2>))

        // para poder realizar dos dispatch, se recomienda usar set time out para un dispatch  mas limpio
        setTimeout(() => {
            dispatch(gamesSearch(inputSearch))
        }, 1000)
        setInputSearch(inputTemporal);
    }

    return (
        <div className={filterstyle.filter}>
            {/* Formulario inputSearch */}
            <form onSubmit={onSubmitSearch}>
                <input type="text" placeholder="Search..." onChange={onChangeSearch} value={inputSearch} />
                <input type="submit" name="Value" />
            </form>

            {/* formulario CheckBox */}
            <form onSubmit={onSubmit} onChange={onChange} className={filterstyle.globalSelect}>
                {/* preguntando si existen generos y mapeando la variable "labels" q contiene el titulo de cada selector */}
                {generos.length > 0 ? labels.map((e, i) => {
                    index++/* le subis el valor a "index" por cada iteracion */
                    return (
                        <div key={index} className={filterstyle.select}>
                            <label >{e}</label>
                            <select name={e} id={e}>
                                {arraysTotal[i].map((x, y) => {
                                    index2++/* le subis el valor a "index2" por cada iteracion */
                                    return (
                                        <option key={index2}>{x}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                    )
                }) : null}
                <input type="submit" value="Filter" className={filterstyle.submit} />
            </form>

        </div>
    )
}
/* <label>Genero</label>
<select name="Genero" id="lang">
    {generos?.map((e, i) => {
        return (
            <option key={i} value={e}>{e}</option>
        )
    })}
</select>
<label>Db or APi</label>
<select name="Db or APi" id="lang">
    {dbApi?.map((e, i) => {
        return (
            <option key={i} value={e}>{e}</option>
        )
    })}
</select>
<label>Rating</label>
<select name="Rating" id="lang">
    {rating?.map((e, i) => {
        return (
            <option key={i} value={e}>{e}</option>
        )
    })}
</select>
<label>Alphabetical</label>
<select name="Alphabetical" id="lang">
    {alphabetical?.map((e, i) => {
        return (
            <option key={i} value={e}>{e}</option>
        )
    })}
</select> */