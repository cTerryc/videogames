require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const { Videogame, Genero } = require('../db');
const axios = require("axios")

//!  ------> POST /videogames <-------

router.post('/', async (req, res) => {
    let { name, description, released, rating, genres, platforms } = req.body;
    genres = genres.split(', ')
    console.log(genres)
    try {
        //insertando datos en la tabla "Videgame"
        let gameCreated = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms
        })
        let genreDb = await Genero.findAll({where:{name:genres}});
        await gameCreated.addGenero(genreDb);
        // await gameCreated[0].setGenero(genres); // relaciono ID genres al juego creado
        res.status(200).send('Created succesfully')
    } catch (err) {
        console.log(err);
        res.status(400).send("Create Game FAIL")
    }
})

router.get("/", async (req, res) => {
    try {
        const response = await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)
        const name = response.data.results.map(ele => {
            return {
                name: ele.name,
                image: ele.ackground_image,
                rating: ele.rating,
                genres: ele.genres
            }
        })
        console.log(name.length)
        res.status(200).json(name)
    } catch (error) {
        
    }
})
// === GET ===
// Imagen
// Nombre
// Géneros
// rating

// router.post("/", async (req, res) => {
//     try {
//         let {name, released, rating, platforms, genres, description_raw, background_image} = req.body;
//         platforms = buildPlatforms2(platforms);
//         let newVideogame = await Videogame.create({name, released, rating, platforms, description_raw, background_image});
//         let genreDb = await Genre.findAll({where:{name:genres}});
//         newVideogame.addGenre(genreDb);
//         res.status(200).send("Videogame was created");
//     } catch (error) {
//         res.status(400).send("Videogame was not created");
//     }
// })
module.exports = router;