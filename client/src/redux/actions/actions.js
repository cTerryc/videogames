import { JUEGOS_LISTA, GENEROS, PLATFORMS } from "../actionsTypes/actionsTypes.js";

export function games() {
    return function (dispatch) {
        return fetch(`http://localhost:3001/videogames`)
            .then(infoApi => infoApi.json())
            .then(games => {
                dispatch({ type: JUEGOS_LISTA, payload: games })
            })
    }
}

export const GenerosGet = () => {

    const generos = [
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

    return {
        type: GENEROS,
        payload: generos
    }
}

export const PlatformsGet = () => {

    const platforms = [
        "PC",
        "iOS",
        "Android",
        "macOS",
        "PlayStation 4",
        "PlayStation 5",
        "XBOX",
        "PS Vita"
    ]

    return {
        type: PLATFORMS,
        payload: platforms
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