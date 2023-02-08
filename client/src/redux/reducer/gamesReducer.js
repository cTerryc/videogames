import { JUEGOS_LISTA } from "../actionsTypes/actionsTypes.js";

const initialState = {
    allgames: []
}

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case JUEGOS_LISTA:
            return {
                ...state,
                allgames: [...state.allgames, ...action.payload]
            }
        /* case GENRES:
            return {
                ...state,
                genres: [...state.genres, ...action.payload]
            }
        case JUEGOS_SEARCH:
            return {
                ...state,
                gameSearch: [...state.gameSearch, ...action.payload]
            }
        case JUEGO_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case JUEGOS_FAVORITOS:
            return {
                ...state,
                favoritesGames: [...state.favoritesGames, ...action.payload]
            }
        case JUEGO_CREATION:
            return {
                ...state,
                post: [...state.games, ...action.payload]
            } */

        default:
            return state
    }
}

export default gamesReducer;


