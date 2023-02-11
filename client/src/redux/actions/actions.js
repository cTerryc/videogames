import { JUEGOS_LISTA, GENEROS, PLATFORMS, JUEGOS_SEARCH, SEARCHPAGESTATE, FILTERSTATE } from "../actionsTypes/actionsTypes.js";

export function games(allGames) {
    if (allGames.length === 0) {
        console.log("entro al arrah Vacio")
        return {
            type: JUEGOS_LISTA,
            payload: []
        }
    }
    return function (dispatch) {
        return fetch(`http://localhost:3001/videogames`)
            .then(infoApi => infoApi.json())
            .then(games => {
                dispatch({ type: JUEGOS_LISTA, payload: games })
            })
    }
}

export const GenerosGet = () => {

    let generos = [
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

    let platforms = [
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

// export const Rating = () => {

//     let rating = [1,2,3,4,5]

//     return {
//         type: RATING,
//         payload: rating
//     }
// }

export const gamesSearch = (name) => {
    console.log("esto es NAME en actio",name)
    if (name.length === 0) {
        console.log("entro al arrah Vacio")
        return {
            type: JUEGOS_SEARCH,
            payload: []
        }
    }
    console.log("no entro al array vacio")
    return function (dispatch) {
        return fetch(`http://localhost:3001/videogames?name=${name}`)
            .then(infoApi => infoApi.json())
            .then(games => {
                dispatch({ type: JUEGOS_SEARCH, payload: games })
            })
    }
}

export const searchPagseState = (state) => {
    return {
        type: SEARCHPAGESTATE,
        payload: state
    }
}

export const actionFilterState = (state) => {
    return {
        type: FILTERSTATE,
        payload: state
    }
}

// export const genres = (state = initialState, action) => {

// }

// export const gameCreation = (state = initialState, action) => {

// }

/* export function games() {
    return async function (dispatch) {
        console.log("entro a la accion")
        const games = await axios.get(`http://localhost:3001/videogames`)
        console.log(games.data)
                return dispatch({ type: JUEGOS_LISTA, payload: games.data })
        
    }
} */