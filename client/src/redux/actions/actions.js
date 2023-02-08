import { JUEGOS_LISTA } from "../actionsTypes/actionsTypes.js";
import axios from "axios"


export function games() {
    return function (dispatch) {
        return fetch(`http://localhost:3001/videogames`)
            .then(infoApi => infoApi.json())
            .then(games => {
                dispatch({ type: JUEGOS_LISTA, payload: games })
            })
    }
}

/* export const gamesSearch = (state = initialState, action) => {

}

export const gameId = (state = initialState, action) => {

}

export const genres = (state = initialState, action) => {

}

export const gameCreation = (state = initialState, action) => {

} */

/* export function games() {
    return async function (dispatch) {
        console.log("entro a la accion")
        const games = await axios.get(`http://localhost:3001/videogames`)
        console.log(games.data)
                return dispatch({ type: JUEGOS_LISTA, payload: games.data })
        
    }
} */