require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const { Videogame, Genero } = require('../db');
const axios = require("axios")

//!  ------> POST /videogames <-------

router.post('/', async (req, res) => {
    let { name, description, released, rating, genres, platforms } = req.body;

    // genres es un "String", conviertiendo en Array
    genres = genres.split(', ')
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
            // Obteniendo todos los juegos de la API GAME
            const getApi = await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)
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
            console.log("Esto es la cantidad de Videogames",responseTotal.length)
            res.status(200).json(responseTotal)
        } catch (error) {
            res.status(400).send("Server error, games not found")
        }
    }
})





module.exports = router;