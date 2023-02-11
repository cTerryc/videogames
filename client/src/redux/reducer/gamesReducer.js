import { JUEGOS_LISTA, GENEROS, PLATFORMS, JUEGOS_SEARCH, SEARCHPAGESTATE, FILTERSTATE } from "../actionsTypes/actionsTypes.js";

const initialState = {
    allgames: [],
    generos: [],
    platforms: [],
    searchGames: [],
    searchpagestate: <h2>Loading...</h2>,
    filterState:[]
}

const gamesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case JUEGOS_LISTA:
            return {
                ...state,
                allgames: actions.payload
            }
        case GENEROS:
            return {
                ...state,
                generos: actions.payload
            };
        case PLATFORMS:
            return {
                ...state,
                platforms: [...state.platforms, ...actions.payload]
            }
        case JUEGOS_SEARCH:
            return {
                ...state,
                searchGames: actions.payload
            }
        case SEARCHPAGESTATE:
            return {
                ...state,
                searchpagestate: actions.payload
            }
        case FILTERSTATE:
            return {
                ...state,
                filterState: actions.payload
            }
        // case JUEGO_DETAILS:
        //     return {
        //         ...state,
        //         details: action.payload
        //     }
        // case JUEGOS_FAVORITOS:
        //     return {
        //         ...state,
        //         favoritesGames: [...state.favoritesGames, ...action.payload]
        //     }
        // case JUEGO_CREATION:
        //     return {
        //         ...state,
        //         post: [...state.games, ...action.payload]
        //     }

        default:
            return state
    }
}

export default gamesReducer;


