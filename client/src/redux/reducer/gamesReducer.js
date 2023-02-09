import { JUEGOS_LISTA, GENEROS, PLATFORMS } from "../actionsTypes/actionsTypes.js";

const initialState = {
    allgames: [],
    generos: [],
    platforms: []
}

const gamesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case JUEGOS_LISTA:
            return {
                ...state,
                allgames: [...state.allgames, ...actions.payload]
            }
        case GENEROS:
            return {
                ...state,
                generos: [...state.generos, ...actions.payload]
            };
        case PLATFORMS:
            return {
                ...state,
                platforms: [...state.platforms, ...actions.payload]
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


