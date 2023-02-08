require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const { Videogame, Genero } = require('../db');
const axios = require("axios")

//!  ------> POST /videogames <-------

router.post('/', async (req, res) => {
    let { name, description, released, rating, genres, platforms } = req.body;
    platforms = platforms.toString()
    // genres es un "String", conviertiendo en Array
    if (typeof genres === "string") {
        genres = genres.split(', ')
    }
    try {
        //insertando datos en la tabla "Videgame"
        let gameCreated = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms
        })

        // obteniendo juegos de la Db solo los nombres
        let genreDb = await Genero.findAll({ where: { name: genres } });

        // agrengando los generos a la relacion videogamegeneros
        await gameCreated.addGenero(genreDb);
        res.status(200).send('Created succesfully')
    } catch (err) {
        res.status(400).send("Create Game FAIL")
    }
})

//!  ------> GET /videogames Lista de todos los Videojuegos<-------

router.get("/", async (req, res) => {

    // extrayendo nombre Query
    const nameQuery = req.query.name;

    // Obteniendo los juegos creados desde mi servidor local => esto sera un array
    const responseDb = await Videogame.findAll({ include: Genero })




    //!  ------> GET /videogames Query<-------
    if (nameQuery) {
        try {
            // Obteniendo todos los juegos de la API GAME
            const getApi = await axios(`https://api.rawg.io/api/games?search=${nameQuery}&key=${API_KEY}`)

            // filtrando toda la info para q solo me devuelva un array de juegos, con las propeidades que necesito
            const responseApi = getApi.data.results.map(ele => {
                return {
                    id: ele.id,
                    name: ele.name,
                    image: ele.background_image,
                    released: ele.released,
                    rating: ele.rating,
                    Generos: ele.genres,
                    platforms: ele.platforms
                }
            })

            // Concatenando ambos array responseApi y responseDb
            const responseTotal = responseApi.concat(responseDb)

            let arrayNames = [];
            // let i = 0;
            for (game of responseTotal) {
                if (arrayNames.length >= 15) {
                    break
                }
                if (game.name.toLowerCase().includes(nameQuery.toLocaleLowerCase())) {
                    arrayNames.push(game);
                }
            }
            console.log("La cantidad de elementos Encontrados: ", arrayNames.length)

            //verificando si arrayNames es menor para responder
            if (arrayNames.length >= 1) {
                res.status(200).json(arrayNames)
            }
            else {
                res.status(400).send("Game Not Fund")
            }
        } catch (error) {
            res.status(400).send("Server Error, API no responde")
        }

    } else {

        //!  ------> GET /videogames <-------
        try {

            // creando un array con todos los Links de la API q voy a solicitar, para poder tener los 100 juegos
            let arrayGetApi = [
                axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
                axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
                axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
                axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
                axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
            ]
            // aqui voy a introducir todos los juegos obtenidos de la API
            let getTotalApi = []

            // Recorriendo "arrayGetApi", y capturando cada uno uno de los EndPoints
            await Promise.all(arrayGetApi)
                .then(e => {
                    //! capturando los elementos de cada EndPoint y concatenando con "getTotalApi"
                    e.forEach(e => {
                        //"e.data.results" es un array donde cada elemento es un objeto y cada objeto contiene un juego, estoy capturando todos los elementos e intruduciendolos en el array "getTotalApi"
                        getTotalApi = [...getTotalApi, ...e.data.results]
                    })
                })
                .catch(e => console.log(e))

            console.log(getTotalApi.length)
            res.status(200).send(getTotalApi)
        } catch (error) {
            res.status(400).send("Server error, games not found")
        }
    }
})





module.exports = router;